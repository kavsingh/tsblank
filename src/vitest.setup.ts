import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/preact";
import { expect, afterEach } from "vitest";

afterEach(() => {
	cleanup();
});

expect.extend(matchers);
