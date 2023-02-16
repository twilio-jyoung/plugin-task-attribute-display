import React from "react";
import {
	ITask,
	TaskContextProps,
	Theme,
	withTaskContext,
	withTheme,
} from "@twilio/flex-ui";
import { CodeBlock } from "@twilio-paste/core/code-block";

import {
	SideModal,
	SideModalBody,
	SideModalButton,
	SideModalContainer,
	SideModalHeader,
	SideModalHeading,
} from "@twilio-paste/core/side-modal";

import { ProductCLIIcon } from "@twilio-paste/icons/esm/ProductCLIIcon";

import styled from "styled-components";

const IconWrapper = styled.div`
	margin: 0.8rem;
`;

function cleanTaskObject(task: ITask): Partial<ITask> | undefined {
	if (task) {
		let result: Partial<ITask> = {
			addOns: task.addOns,
			age: task.age,
			attributes: task.attributes,
			channelType: task.channelType,
			conference: task.conference,
			dateCreated: task.dateCreated,
			dateUpdated: task.dateUpdated,
			defaultFrom: task.defaultFrom,
			formattedAttributes: task.formattedAttributes,
			incomingTransferObject: task.incomingTransferObject,
			outgoingTransferObject: task.outgoingTransferObject,
			priority: task.priority,
			queueName: task.queueName,
			queueSid: task.queueSid,
			reason: task.reason,
			routingTarget: task.routingTarget,
			sid: task.sid,
			status: task.status,
			taskChannelSid: task.taskChannelSid,
			taskChannelUniqueName: task.taskChannelUniqueName,
			taskSid: task.taskSid,
			taskStatus: task.taskStatus,
			timeout: task.timeout,
			workerSid: task.workerSid,
			workflowName: task.workflowName,
			workflowSid: task.workerSid,
			// omit these two attributes as they create circular references
			// which builder.io cannot work with.  never seen these actually used before.

			// source: task.source,
			// sourceObject: task.sourceObject,
		};

		return result;
	} else {
		return undefined;
	}
}

const TaskAttributeDisplay = (props: TaskContextProps & { theme: Theme }) => {
	if (props.task) {
		let cleanTask = cleanTaskObject(props.task);
		return (
			<SideModalContainer>
				<IconWrapper>
					<SideModalButton variant="secondary_icon" size="reset">
						<ProductCLIIcon
							decorative={false}
							title="Description of icon"
							size="sizeIcon40"
						/>
					</SideModalButton>
				</IconWrapper>
				<SideModal aria-label="My Dialog">
					<SideModalHeader>
						<SideModalHeading>Task Attributes</SideModalHeading>
					</SideModalHeader>
					<SideModalBody>
						<CodeBlock
							language="json"
							code={JSON.stringify(cleanTask, undefined, 4)}
							variant="multi-line"
						/>
					</SideModalBody>
				</SideModal>
			</SideModalContainer>
		);
	} else {
		return <React.Fragment />;
	}
};

export default withTheme(withTaskContext(TaskAttributeDisplay));
