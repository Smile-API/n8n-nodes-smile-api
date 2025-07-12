import { INodeProperties } from 'n8n-workflow';

export const resources: INodeProperties = {
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
			name: 'Instância',
			value: 'instances-api',
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
	default: 'messages-api',
};
