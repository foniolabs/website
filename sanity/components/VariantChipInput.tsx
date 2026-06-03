"use client";

import { CheckmarkIcon } from "@sanity/icons";
import { Card, Flex, Inline, Stack, Text } from "@sanity/ui";
import { set, type StringInputProps, unset } from "sanity";

type ChipOption = {
  value: string;
  label: string;
  // Either a swatch colour (CSS) or an icon name. Color used for CTA tones,
  // swatch for hero layouts.
  swatch?: string;
  preview?: string;
};

const HERO_VARIANT_PREVIEW: Record<string, string> = {
  split: "▮▯",
  centered: "▯▮▯",
  videoBg: "◼︎",
};

const CTA_TONE_SWATCH: Record<string, string> = {
  default: "var(--card-muted-bg-color, #efeff3)",
  accent: "linear-gradient(135deg, #ff7a18, #af002d)",
  dark: "#111",
};

const inferChips = (
  fieldName: string,
  list: Array<{ value: string; title?: string } | string>,
): ChipOption[] =>
  list.map((entry) => {
    const value =
      typeof entry === "string" ? entry : (entry.value as string);
    const label =
      typeof entry === "string"
        ? entry
        : entry.title ?? (entry.value as string);

    // Decide visualisation based on field name (a light heuristic — the goal
    // is "marketing sees a meaningful chip", not a perfect taxonomy).
    if (/tone|colou?r/i.test(fieldName)) {
      return { value, label, swatch: CTA_TONE_SWATCH[value] ?? "#ccc" };
    }
    if (/variant|layout/i.test(fieldName)) {
      return { value, label, preview: HERO_VARIANT_PREVIEW[value] ?? "■" };
    }
    return { value, label, preview: "●" };
  });

export function VariantChipInput(props: StringInputProps) {
  const { value, onChange, schemaType, readOnly, elementProps } = props;

  const listOption = (
    schemaType.options as { list?: Array<{ value: string; title?: string } | string> }
  )?.list;
  if (!listOption || !Array.isArray(listOption)) {
    return props.renderDefault(props);
  }

  const chips = inferChips(schemaType.name, listOption);
  // elementProps exposes id/aria/ref so screen-readers + form validation
  // still target the underlying input. We pass the subset Inline understands.
  const { id, "aria-describedby": describedBy } = elementProps;

  return (
    <Stack space={2}>
      <Inline space={2} id={id} aria-describedby={describedBy}>
        {chips.map((chip) => {
          const selected = chip.value === value;
          return (
            <button
              key={chip.value}
              type="button"
              disabled={readOnly}
              onClick={() =>
                onChange(selected ? unset() : set(chip.value))
              }
              style={{
                appearance: "none",
                border: selected
                  ? "2px solid var(--card-focus-ring-color, #2276fc)"
                  : "1px solid var(--card-border-color, #d3d4d8)",
                background: "var(--card-bg-color, #fff)",
                padding: 0,
                borderRadius: 8,
                cursor: readOnly ? "not-allowed" : "pointer",
                opacity: readOnly ? 0.6 : 1,
                minWidth: 96,
              }}
              aria-pressed={selected}
            >
              <Card padding={2} radius={2} tone={selected ? "primary" : "default"}>
                <Stack space={2}>
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      height: 36,
                      borderRadius: 4,
                      background: chip.swatch ?? "transparent",
                      color: chip.swatch?.includes("#11") ? "#fff" : undefined,
                      fontSize: 18,
                      letterSpacing: 2,
                    }}
                  >
                    {chip.preview ?? null}
                  </Flex>
                  <Flex align="center" justify="center" gap={1}>
                    {selected && <CheckmarkIcon />}
                    <Text size={1} weight={selected ? "semibold" : "regular"}>
                      {chip.label}
                    </Text>
                  </Flex>
                </Stack>
              </Card>
            </button>
          );
        })}
      </Inline>
    </Stack>
  );
}

export const variantChipInputComponents = {
  input: VariantChipInput,
} as const;
