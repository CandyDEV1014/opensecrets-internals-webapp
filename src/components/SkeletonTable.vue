<template>
	<div>
	<Skeleton :rows="5" :animation="false">
		<table>
			<thead>
			<tr>
				<th>Column 1</th>
				<th>Column 2</th>
				<th>Column 3</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in items" :key="item.id">
				<td>{{ item.column1 }}</td>
				<td>{{ item.column2 }}</td>
				<td>{{ item.column3 }}</td>
			</tr>
			</tbody>
		</table>
	</Skeleton>
	</div>
</template>
 
 <script>
 import { defineComponent } from 'vue';
 import Skeleton from 'vue-skeletor';
 
 export default defineComponent({
	name: 'TableWithSkeleton',
	components: {
		Skeleton,
	},
	data() {
		return {
			items: [
				{ id: 1, column1: 'row 1 column 1', column2: 'row 1 column 2', column3: 'row 1 column 3' },
				{ id: 2, column1: 'row 2 column 1', column2: 'row 2 column 2', column3: 'row 2 column 3' },
				{ id: 3, column1: 'row 3 column 1', column2: 'row 3 column 2', column3: 'row 3 column 3' },
			],
		};
	},
 });
 </script>