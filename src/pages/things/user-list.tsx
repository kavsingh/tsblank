import { For, Show } from "solid-js";

import { useUsersQuery } from "#app-store/services/user";

export default function UserList() {
	const query = useUsersQuery();

	return (
		<Show when={query().data} keyed>
			{(users) => (
				<ul>
					<For each={users}>
						{(user, idx) => (
							<li
								class={
									idx() < users.length - 1
										? "border-b border-b-neutral-300 py-1 dark:border-b-neutral-800"
										: ""
								}
							>
								<dl class="flex items-baseline gap-2">
									<dt>{user.name}</dt>
									<dd class="text-sm opacity-50">{user.email}</dd>
								</dl>
							</li>
						)}
					</For>
				</ul>
			)}
		</Show>
	);
}
