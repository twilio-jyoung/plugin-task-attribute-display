import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import TaskAttributeDisplay from "./components/TaskAttributeDisplay";
import {
	CustomizationProvider,
	PasteCustomCSS,
	CustomizationProviderProps,
} from "@twilio-paste/core/customization";

const PLUGIN_NAME = "TaskAttributeDisplayPlugin";

export default class TaskAttributeDisplayPlugin extends FlexPlugin {
	constructor() {
		super(PLUGIN_NAME);
	}

	async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
		// sets paste as a theme provider so all components inherit styles and update on token / theme changes.
		flex.setProviders({
			CustomProvider: (RootComponent) => (props) => {
				const pasteProviderProps: CustomizationProviderProps & {
					style: PasteCustomCSS;
				} = {
					baseTheme: props.theme?.isLight ? "default" : "dark",
					theme: props.theme?.tokens,
					style: { minWidth: "100%", height: "100%" },
				};
				return (
					<CustomizationProvider {...pasteProviderProps}>
						<RootComponent {...props} />
					</CustomizationProvider>
				);
			},
		});

		flex.TaskCanvasHeader.Content.add(<TaskAttributeDisplay key="tad" />, {
			sortOrder: 1,
			align: "start",
			if: (props) =>
				props.task &&
				props.task.attributes &&
				props.task.attributes !== undefined,
		});
	}
}
