import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Disable autoUpdates because we pin versions in package.json
  autoUpdates: false,
});
