import { IExecuteFunctions } from 'n8n-workflow';

import { sendAudio } from './messages/sendAudio';
import { sendDocument } from './messages/sendDocument';
import { sendImage } from './messages/sendImage';
import { sendPoll } from './messages/sendPoll';
import { sendContact } from './messages/sendContact';
import { sendStories } from './messages/sendStories';
import { sendText } from './messages/sendText';
import { sendVideo } from './messages/sendVideo';
import { sendList } from './messages/sendList';
import { sendButtons } from './messages/sendButtons';
import { sendPix } from './messages/sendPix';
import { sendReaction } from './messages/sendReaction';
type ResourceOperationFunctions = {
	[resource: string]: {
		[operation: string]: (ef: IExecuteFunctions) => Promise<any>;
	};
};

// este dicionario é utilizado para mapear as operações disponíveis para cada recurso e operação para cada função
export const resourceOperationsFunctions: ResourceOperationFunctions = {
	'messages-api': {
		'send-text': sendText,
		'send-image': sendImage,
		'send-video': sendVideo,
		'send-audio': sendAudio,
		'send-document': sendDocument,
		'send-poll': sendPoll,
		'send-contact': sendContact,
		'send-list': sendList,
		'send-buttons': sendButtons,
		'send-stories': sendStories,
		'send-pix': sendPix,
		'send-reaction': sendReaction,
	},
};
