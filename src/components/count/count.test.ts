import { screen } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";
import { describe, beforeEach, it, expect } from "vitest";

import { Count } from "./index";

describe(Count, () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("should render correctly", () => {
		expect.assertions(3);

		const { el } = Count();

		document.body.append(el);

		expect(screen.getByText("-")).toBeInTheDocument();
		expect(screen.getByText("00")).toBeInTheDocument();
		expect(screen.getByText("+")).toBeInTheDocument();
	});

	it("should update count", async () => {
		expect.assertions(5);

		const { el } = Count({ initialCount: 2, step: 0.5 });
		const user = userEvent.setup();

		document.body.append(el);

		expect(screen.getByText("02")).toBeInTheDocument();

		await user.click(screen.getByText("+"));

		expect(screen.getByText("2.5")).toBeInTheDocument();
		expect(screen.queryByText("02")).not.toBeInTheDocument();

		await user.click(screen.getByText("-"));
		await user.click(screen.getByText("-"));

		expect(screen.getByText("1.5")).toBeInTheDocument();
		expect(screen.queryByText("2.5")).not.toBeInTheDocument();
	});
});
