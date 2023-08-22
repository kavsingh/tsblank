import { render, screen, waitFor } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { AppStoreProvider } from "#app-store/context";
import { createAppStore } from "#app-store/create";

import Things from "./index";

import type { ParentProps } from "solid-js";

describe("<Things /> page", () => {
	it("should add todo", async () => {
		expect.assertions(1);

		const { Wrapper, ue, disposeStore } = setupWrapper();

		render(() => <Things />, { wrapper: Wrapper });

		await ue.type(await screen.findByLabelText("Description"), "Todo 1");
		await ue.click(await screen.findByRole("button", { name: "Add todo" }));

		await waitFor(() => {
			expect(screen.getByText("Todo 1")).toBeInTheDocument();
		});

		disposeStore();
	});

	it("should render users", async () => {
		expect.assertions(2);

		const { Wrapper, disposeStore } = setupWrapper();

		render(() => <Things />, { wrapper: Wrapper });

		await waitFor(() => {
			expect(screen.getByText(/User1 Test/i)).toBeInTheDocument();
		});

		expect(screen.getByText(/User2 Test/i)).toBeInTheDocument();

		disposeStore();
	});

	it("should add user", async () => {
		expect.assertions(1);

		const { Wrapper, ue, disposeStore } = setupWrapper();

		render(() => <Things />, { wrapper: Wrapper });

		await ue.type(await screen.findByLabelText("Name"), "New User");
		await ue.type(await screen.findByLabelText("Email"), "new@user.com");
		await ue.click(await screen.findByRole("button", { name: "Add user" }));

		await waitFor(() => {
			expect(screen.getByText(/New User/i)).toBeInTheDocument();
		});

		disposeStore();
	});
});

function setupWrapper() {
	const ue = userEvent.setup();
	const { store, dispose } = createAppStore();

	function Wrapper(props: ParentProps) {
		return <AppStoreProvider store={store}>{props.children}</AppStoreProvider>;
	}

	return { Wrapper, ue, store, disposeStore: dispose };
}
