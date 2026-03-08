import { For, Show } from "solid-js";

import { useUsersQuery } from "~/app-store/services/user";

import type { JSX } from "solid-js";

export function UserList(): JSX.Element {
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
										? "border-be border-be-neutral-300 py-1 dark:border-be-neutral-800"
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
