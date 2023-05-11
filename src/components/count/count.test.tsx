import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import Count from "./count";

describe("<Count />", () => {
	it("should render correctly", () => {
		render(<Count initialCount={0} />);

		expect(screen.getByText("-")).toBeInTheDocument();
		expect(screen.getByText("00")).toBeInTheDocument();
		expect(screen.getByText("+")).toBeInTheDocument();
	});

	it("should update count", async () => {
		const interactor = userEvent.setup();

		render(<Count initialCount={2} step={0.5} />);

		expect(screen.getByText("02")).toBeInTheDocument();

		await interactor.click(screen.getByText("+"));

		expect(screen.getByText("2.5")).toBeInTheDocument();
		expect(screen.queryByText("02")).not.toBeInTheDocument();

		await interactor.click(screen.getByText("-"));
		await interactor.click(screen.getByText("-"));

		expect(screen.getByText("1.5")).toBeInTheDocument();
		expect(screen.queryByText("2.5")).not.toBeInTheDocument();
	});
});
