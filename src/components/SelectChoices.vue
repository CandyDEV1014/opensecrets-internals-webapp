<template>
	<div class="form-field">
		<select :name="name" v-model="selectedOption" @input="validateField" v-choices :class="inputClass">
			<option placeholder value="" selected>Select</option>
			<option v-for="option in options" :key="option" :value="option">{{ option }}</option>
		</select>
		<div v-if="errorMessage" class="form-field__error">{{ errorMessage }}</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useField } from 'vee-validate';

export default defineComponent({
	name: 'SelectChoices',
	props: {
		name: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: false,
		},
		options: {
			type: Array,
			required: false,
		},
		rules: {
			type: Array,
			default: () => [],
		},        
		inputClass: {
			type: String,
			default: ''
		}
	},
	setup(props) {
		const { value: selectedOption, errorMessage, validate } = useField(props.name, ...props.rules);
		const validateField = () => validate(selectedOption);

		return {
			selectedOption,
			errorMessage,
			validateField,
		};
	},
});
</script>