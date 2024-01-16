import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, beforeAll, afterEach, afterAll } from "vitest";

import { server } from "./src/__mock-api__/node";

expect.extend(matchers);

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
