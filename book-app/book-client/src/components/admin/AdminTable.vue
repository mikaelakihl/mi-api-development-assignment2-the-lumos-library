<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
	tableHeaderOne: String,
	tableHeaderTwo: String,
	tableHeaderThree: String,
	tableHeaderFour: String,
	dbTableName: String,
});

const tableHeaders = computed(() => [
	props.tableHeaderOne,
	props.tableHeaderTwo,
	props.tableHeaderThree,
	props.tableHeaderFour,
]);

const API_URL = import.meta.env.VITE_API_URL;
const fetchedData = ref([]);

const fetchData = async () => {
	try {
		if (!props.dbTableName) {
			throw new Error('Missing dbTableName prop.');
		}
		const URL = `${API_URL}/${props.dbTableName}`;
		console.log('URL: ', + URL);
		const response = await fetch(URL);

		if (!response.ok) {
			throw new Error(`HTTP-error: ${response.status}`);
		}

		const data = await response.json();
		fetchedData.value = data;
	} catch (error) {
		console.error('Error fetching data: ' + error); //TODO: Add better error-handling
	}
};

function capitalizeHeader(header) {
	if (!header) {
		return '';
	}
	const newHeader = header.charAt(0).toUpperCase() + header.slice(1);
	return newHeader;
}

onMounted(fetchData);
</script>

<template>
	<table>
		<thead>
			<tr>
				<th v-for="column in tableHeaders" :key="column">
					{{ capitalizeHeader(column) }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in fetchedData" :key="index">
				<td v-for="column in tableHeaders" :key="column">
					{{ item[column] }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="scss">
table {
	width: 100%;
	border-collapse: collapse;
	border-top: 5px solid #f0ecde;
    margin-bottom: 2rem;
	display: block;
	overflow-x: auto;
}
thead {
	text-align: left;
}
th {
	font-family: $font-paragraph;
	font-size: $h-small-mobile;
	padding: 1rem 2rem;
}
tbody {
    tr {
        border-bottom: 0.5rem solid $color-background;
        background-color: #f0ecde;
        td {
            padding: 1.5rem 2rem;
            font-family: $font-paragraph;
            font-size: 1rem;
        }
    }
}
</style>
