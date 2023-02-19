import { screen } from "@testing-library/dom";
import { describe, beforeEach, it, expect } from "vitest";

import app from "./app";

describe("App", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("should initialize", () => {
		const root = document.body.appendChild(document.createElement("div"));

		app(root);

		expect(screen.getByText("hello")).toBeInTheDocument();
	});
});
