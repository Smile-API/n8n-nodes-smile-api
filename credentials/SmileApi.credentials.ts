import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SmileApi implements ICredentialType {
	name = 'smileApi';
	displayName = 'Smile API';
	documentationUrl = 'https://api.smileapi.com.br/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'Digite o seu Username',
			description: 'Digite o seu Username da sua conta na SmileAPI',
		},
		{
			displayName: 'Phone Number ID',
			name: 'phone_number_id',
			type: 'string',
			default: '',
			required: true,
			placeholder: '552342843689659',
			description: 'Digite o Phone-Number-ID da sua Instacia',
		},
		{
			displayName: 'Business Account ID',
			type: 'string',
			name: 'businessAccountId',
			default: '',
			required: true,
		},
		{
			displayName: 'Access Token',
			type: 'string',
			typeOptions: { password: true },
			name: 'accessToken',
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.smileapi.com.br',
			url: '=/{{$credentials.username}}/v1/{{$credentials.phone_number_id}}/instance',
			method: 'GET',
			headers: {
				accept: '*/*',
			},
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					message: 'Success',
					key: 'status',
					value: 200,
				},
			},
		],
	};
}
