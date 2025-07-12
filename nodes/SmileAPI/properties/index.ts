import { INodeProperties } from 'n8n-workflow';
import { messagesFields as messagesFields } from './messages.fields';

const resourcesOptions: INodeProperties = {
	displayName: 'Recurso',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Chat',
			value: 'chat-api',
		},
		{
			name: 'Evento',
			value: 'events-api',
		},
		{
			name: 'Grupo',
			value: 'groups-api',
		},
		{
			name: 'Instancia',
			value: 'instances-api',
		},
		{
			name: 'Integração',
			value: 'integrations-api',
		},
		{
			name: 'Mensagem',
			value: 'messages-api',
		},
		{
			name: 'Perfil',
			value: 'profile-api',
		},
	],
	default: 'instances-api',
};

export const smileApiNodeProperties = [
	resourcesOptions,
	// Funções disponíveis quando selecionado o recurso "Instancias"
	...messagesFields,
];
