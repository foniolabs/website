"use client";

import {
  Badge,
  Button,
  Card,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@sanity/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type SlugInputProps,
  type SlugValue,
  useClient,
  useFormValue,
} from "sanity";

import { apiVersion } from "../env";

const PATH_PREFIX_BY_TYPE: Record<string, string> = {
  page: "/",
  post: "/blog/",
  product: "/products/",
  teamMember: "/team/",
};

type CollisionResult =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "clear" }
  | { state: "collision"; otherId: string; otherTitle?: string };

const undraftedId = (id: string) =>
  id.startsWith("drafts.") ? id.slice("drafts.".length) : id;

const buildPath = (prefix: string, slug: string) => {
  const left = prefix.endsWith("/") ? prefix : `${prefix}/`;
  const right = slug.startsWith("/") ? slug.slice(1) : slug;
  return `${left}${right}`.replace(/\/+/g, "/");
};

export function SlugInput(props: SlugInputProps) {
  const { value } = props;
  const client = useClient({ apiVersion });

  // The whole document — gives us _id, _type, and persisted slug if any.
  const documentValue = useFormValue([]) as
    | { _id?: string; _type?: string; slug?: SlugValue }
    | undefined;
  const documentId = documentValue?._id ? undraftedId(documentValue._id) : null;
  const documentType = documentValue?._type ?? null;

  const pathPrefix = PATH_PREFIX_BY_TYPE[documentType ?? ""] ?? "/";

  const [persistedSlug, setPersistedSlug] = useState<string | null>(null);
  const [collision, setCollision] = useState<CollisionResult>({ state: "idle" });
  const [creatingRedirect, setCreatingRedirect] = useState(false);
  const [redirectCreated, setRedirectCreated] = useState(false);

  // Load the persisted (published) slug once per document, so we know what to
  // redirect FROM when the editor renames.
  useEffect(() => {
    if (!documentId || !documentType) return;
    let cancelled = false;
    client
      .fetch<{ current?: string } | null>(
        `*[_id == $id][0].slug`,
        { id: documentId },
      )
      .then((res) => {
        if (cancelled) return;
        setPersistedSlug(res?.current ?? null);
      })
      .catch(() => {
        // Network failures here are non-fatal — the redirect prompt just
        // won't appear. Editors can still type freely.
      });
    return () => {
      cancelled = true;
    };
  }, [client, documentId, documentType]);

  // Collision check: any other doc of the same type using this slug?
  const currentSlug = value?.current?.trim() ?? "";
  useEffect(() => {
    if (!currentSlug || !documentType) {
      setCollision({ state: "idle" });
      return;
    }
    setCollision({ state: "checking" });
    const handle = setTimeout(async () => {
      try {
        const draftId = documentId ? `drafts.${documentId}` : null;
        const conflict = await client.fetch<
          { _id: string; title?: string; name?: string } | null
        >(
          `*[_type == $type
            && slug.current == $slug
            && _id != $id
            && _id != $draftId][0]{_id, title, name}`,
          {
            type: documentType,
            slug: currentSlug,
            id: documentId ?? "__none__",
            draftId: draftId ?? "__none__",
          },
        );
        if (conflict) {
          setCollision({
            state: "collision",
            otherId: undraftedId(conflict._id),
            otherTitle: conflict.title ?? conflict.name,
          });
        } else {
          setCollision({ state: "clear" });
        }
      } catch {
        setCollision({ state: "idle" });
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [client, currentSlug, documentId, documentType]);

  const needsRedirect = useMemo(() => {
    if (!persistedSlug || !currentSlug) return false;
    if (persistedSlug === currentSlug) return false;
    return true;
  }, [persistedSlug, currentSlug]);

  const handleCreateRedirect = useCallback(async () => {
    if (!persistedSlug || !currentSlug) return;
    setCreatingRedirect(true);
    try {
      await client.create({
        _type: "redirect",
        from: buildPath(pathPrefix, persistedSlug),
        to: buildPath(pathPrefix, currentSlug),
        statusCode: 301,
        note: `Auto-created from SlugInput on ${new Date()
          .toISOString()
          .slice(0, 10)}`,
      });
      setRedirectCreated(true);
    } catch (err) {
      // Surface to the editor via the Badge below; don't crash the form.
      console.error("Failed to create redirect:", err);
    } finally {
      setCreatingRedirect(false);
    }
  }, [client, currentSlug, pathPrefix, persistedSlug]);

  // Wrap the default Sanity slug UI; the extras render underneath.
  return (
    <Stack space={3}>
      {props.renderDefault(props)}

      {currentSlug && (
        <Card padding={3} tone="transparent" border radius={2}>
          <Stack space={3}>
            <Flex align="center" gap={2} wrap="wrap">
              <Text size={1} muted>
                Resolves to:
              </Text>
              <Badge tone="primary" mode="outline">
                {buildPath(pathPrefix, currentSlug)}
              </Badge>
              {collision.state === "checking" && (
                <Flex align="center" gap={2}>
                  <Spinner muted />
                  <Text size={1} muted>
                    checking…
                  </Text>
                </Flex>
              )}
              {collision.state === "clear" && (
                <Badge tone="positive" mode="outline">
                  unique
                </Badge>
              )}
              {collision.state === "collision" && (
                <Badge tone="critical" mode="outline">
                  collides with “{collision.otherTitle ?? collision.otherId}”
                </Badge>
              )}
            </Flex>

            {needsRedirect && !redirectCreated && (
              <Card
                padding={3}
                radius={2}
                tone="caution"
                border
              >
                <Stack space={3}>
                  <Text size={1}>
                    Slug changed from{" "}
                    <code>{buildPath(pathPrefix, persistedSlug ?? "")}</code> →{" "}
                    <code>{buildPath(pathPrefix, currentSlug)}</code>.
                    Create a 301 to keep inbound links and search rankings.
                  </Text>
                  <Flex>
                    <Button
                      mode="ghost"
                      tone="primary"
                      text="Create 301 redirect"
                      onClick={handleCreateRedirect}
                      disabled={creatingRedirect}
                      loading={creatingRedirect}
                    />
                  </Flex>
                </Stack>
              </Card>
            )}

            {redirectCreated && (
              <Card padding={3} radius={2} tone="positive" border>
                <Text size={1}>
                  Redirect created. The change goes live next deploy (Day 9
                  wires next.config.ts to read redirect docs at build time).
                </Text>
              </Card>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}

// Helper so schemas can register this input without restating its type.
export const slugInputComponents = {
  input: SlugInput,
} as const;
