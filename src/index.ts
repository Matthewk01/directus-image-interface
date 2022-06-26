import InterfaceComponent from './interface.vue';
import { defineInterface } from '@directus/shared/utils';

export default defineInterface({
	id: 'image-editable',
	name: 'ImageEditable',
	description: 'Image interface extension supporting cropping and flipping.',
	icon: 'insert_photo',
	component: InterfaceComponent,
	types: ['uuid'],
	localTypes: ['file'],
	group: 'relational',
	relational: true,
	options: [
		{
			field: 'folder',
			name: '$t:interfaces.system-folder.folder',
			type: 'uuid',
			meta: {
				width: 'half',
				interface: 'system-folder',
				note: '$t:interfaces.system-folder.field_hint',
			},
			schema: {
				default_value: undefined,
			},
		},
		{
			field: 'crop',
			name: '$t:interfaces.file-image.crop',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'boolean',
				options: {
					label: '$t:interfaces.file-image.crop_label',
				},
			},
			schema: {
				default_value: true,
			},
		},
	],
	recommendedDisplays: ['image']
});