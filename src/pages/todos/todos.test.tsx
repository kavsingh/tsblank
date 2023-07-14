import { render, screen, waitFor } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { AppStoreProvider } from "#app-store/context";
import { createAppStore } from "#app-store/create";

import Todos from "./index";

import type { ParentProps } from "solid-js";

describe("<Todos /> page", () => {
	it("should add todo", async () => {
		expect.assertions(1);

		const { Wrapper, ue, disposeStore } = setupWrapper();

		render(() => <Todos />, { wrapper: Wrapper });

		await ue.type(await screen.findByLabelText("Description"), "todo 1");
		await ue.click(await screen.findByRole("button"));

		await waitFor(() => {
			expect(screen.getByText("todo 1")).toBeInTheDocument();
		});

		disposeStore();
	});

	it("should render user", async () => {
		expect.assertions(1);

		const { Wrapper, disposeStore } = setupWrapper();

		render(() => <Todos />, { wrapper: Wrapper });

		await waitFor(() => {
			expect(screen.getByText(/User1 Test/i)).toBeInTheDocument();
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
