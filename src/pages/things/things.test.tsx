import { render, screen, waitFor } from "@solidjs/testing-library";
import { userEvent as UserEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { AppStoreProvider } from "#app-store/context";
import { createAppStore } from "#app-store/create";

import Things from "./index";

import type { ParentProps } from "solid-js";

describe("<Things /> page", () => {
	it("should add todo", async () => {
		expect.assertions(1);

		const { Wrapper, userEvent, dispose } = setupWrapper();
		const result = render(() => <Things />, { wrapper: Wrapper });

		await userEvent.type(await screen.findByLabelText("Description"), "Todo 1");
		await userEvent.click(
			await screen.findByRole("button", { name: "Add todo" }),
		);

		await waitFor(() => {
			expect(screen.getByText("Todo 1")).toBeInTheDocument();
		});

		dispose();
		result.unmount();
	});

	it("should render users", async () => {
		expect.assertions(2);

		const { Wrapper, dispose } = setupWrapper();
		const result = render(() => <Things />, { wrapper: Wrapper });

		await waitFor(() => {
			expect(screen.getByText(/User1 Test/i)).toBeInTheDocument();
		});

		expect(screen.getByText(/User2 Test/i)).toBeInTheDocument();

		dispose();
		result.unmount();
	});

	it("should add user", async () => {
		expect.assertions(1);

		const { Wrapper, userEvent, dispose } = setupWrapper();
		const result = render(() => <Things />, { wrapper: Wrapper });

		await userEvent.type(await screen.findByLabelText("Name"), "New User");
		await userEvent.type(await screen.findByLabelText("Email"), "new@user.com");
		await userEvent.click(
			await screen.findByRole("button", { name: "Add user" }),
		);

		await waitFor(() => {
			expect(screen.getByText(/New User/i)).toBeInTheDocument();
		});

		dispose();
		result.unmount();
	});
});

function setupWrapper() {
	const userEvent = UserEvent.setup();
	const { store, dispose } = createAppStore();

	function Wrapper(props: ParentProps) {
		return <AppStoreProvider store={store}>{props.children}</AppStoreProvider>;
	}

	return { Wrapper, userEvent, store, dispose };
}
