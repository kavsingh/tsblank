import { Show } from "solid-js";

import { useUserQuery } from "#app-store/services/user";

export default function User() {
	const query = useUserQuery(1);

	return (
		<Show when={query().data} keyed>
			{(user) => (
				<ul>
					<li>{user.name}</li>
					<li>{user.email}</li>
				</ul>
			)}
		</Show>
	);
}
