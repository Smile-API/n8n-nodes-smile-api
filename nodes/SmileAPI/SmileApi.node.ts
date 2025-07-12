import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';
import { smileApiNodeProperties } from './properties';
import { resourceOperationsFunctions } from './execute';

export class SmileApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Smile API',
		name: 'smileApi',
		icon: 'file:whatsapp.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Smile API',
		defaults: {
			name: 'Smile API',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [
			{
				name: 'smileApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.smileapi.com.br/docs',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		// A estrutura de propriedades do nó:
		// • Resources: Recursos disponíveis (Instancia, Mensagens, Eventos, Integrações)
		// • Operations: Operações de cada recurso (Ex: Criar instancia, Enviar mensagem, Definir Webhook)
		// • Fields: Campos de cada operação
		properties: smileApiNodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Busca a função para o recurso e operação selecionados
		const fn = resourceOperationsFunctions[resource][operation];

		// Se não encontrar a função, retorna um erro
		if (!fn) {
			throw new NodeApiError(this.getNode(), {
				message: 'Operação não suportada.',
				description: `A função "${operation}" para o recurso "${resource}" não é suportada!`,
			});
		}

		// Executa a função
		const responseData = await fn(this);

		// Retornar apenas o JSON
		return [this.helpers.returnJsonArray(responseData)];
	}
}
