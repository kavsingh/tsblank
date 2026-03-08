import { createSignal } from "solid-js";

import { useCreateUserMutation } from "~/app-store/services/user";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

import type { JSX } from "solid-js";

// oxlint-disable-next-line eslint/max-lines-per-function
export function AddUser(): JSX.Element {
	const [createUser] = useCreateUserMutation();
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");

	const handleNameInput: JSX.EventHandler<HTMLInputElement, Event> = (
		event,
	) => {
		if (event.target instanceof HTMLInputElement) setName(event.target.value);
	};

	const handleEmailInput: JSX.EventHandler<HTMLInputElement, Event> = (
		event,
	) => {
		if (event.target instanceof HTMLInputElement) setEmail(event.target.value);
	};

	const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = (event) => {
		event.preventDefault();

		const userName = name();
		const userEmail = email();

		if (!(userName && userEmail)) return;

		void createUser({ name: userName, email: userEmail });

		setName("");
		setEmail("");
	};

	return (
		<form onSubmit={handleSubmit} class="flex flex-col gap-2">
			<label for="user-name" class="flex items-center gap-2">
				Name
				<Input
					id="user-name"
					name="user-name"
					value={name()}
					onInput={handleNameInput}
					autofocus
				/>
			</label>
			<label for="user-email" class="flex items-center gap-2">
				Email
				<Input
					id="user-email"
					name="user-email"
					type="email"
					value={email()}
					onInput={handleEmailInput}
					autofocus
				/>
			</label>
			<Button type="submit" disabled={!(name() && email())}>
				Add user
			</Button>
		</form>
	);
}
