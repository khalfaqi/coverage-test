/**
 * @license
 * Copyright 2025 Kolosal Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { describe } from 'vitest';
import { runScenario } from '../../helpers/scenario-runner.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("Login with username and password", () => {
  runScenario(__dirname);
});
