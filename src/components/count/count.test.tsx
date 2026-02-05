import { screen, render } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Count } from "./index";

describe(Count, () => {
	it("should render correctly", () => {
		expect.assertions(3);

		const result = render(() => <Count initialCount={0} />);

		expect(screen.getByText("-")).toBeInTheDocument();
		expect(screen.getByText("00")).toBeInTheDocument();
		expect(screen.getByText("+")).toBeInTheDocument();

		result.unmount();
	});

	it("should update count", async () => {
		expect.assertions(5);

		const user = userEvent.setup();
		const result = render(() => <Count initialCount={2} step={0.5} />);

		expect(screen.getByText("02")).toBeInTheDocument();

		await user.click(screen.getByText("+"));

		expect(screen.getByText("2.5")).toBeInTheDocument();
		expect(screen.queryByText("02")).not.toBeInTheDocument();

		await user.click(screen.getByText("-"));
		await user.click(screen.getByText("-"));

		expect(screen.getByText("1.5")).toBeInTheDocument();
		expect(screen.queryByText("2.5")).not.toBeInTheDocument();

		result.unmount();
	});
});
