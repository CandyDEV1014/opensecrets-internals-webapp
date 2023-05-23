
<template>
	<MainHeader />

	<MainNav />
	
	<div id="myModal" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true"
		style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="myModalLabel">Selected Items</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div v-if="selectedItems.length > 0">
						<ul>
							<li v-for="item in selectedItems" :key="item">{{ item.name }}</li>
						</ul>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary ">Save Changes</button>
				</div>

			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->


	<!-- Modal confirm -->
	<div id="modalConfirm" class="modal fade" tabindex="-1" aria-labelledby="modalConfirmLabel" aria-hidden="true"
		style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalConfirmLabel">Confirm</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<div class="text-center">
						<img src="../assets/images/upload.svg" alt="" width="100px">
						<h4 class="mt-4"> Are you sure you want to make changes ?</h4>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-primary ">Yes</button>
				</div>

			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<div class="container mt-4">
		<div class="card">
			<div class="card-header pb-0">
				<h4 class="">Review Candidate Person Dupes</h4>
			</div>

			<div class="card-header border-0">
				<div class="row g-4 align-items-center">
					<div class="col-sm-9" style="display: flex;">
						<div class="search-box form-control" style="height: 30px; padding: 0px;">
							<Codemirror v-model="code" language="sql"
								:options="{ hideCursorInOverviewRuler: true, glyphMargin: false, folding: false, lineNumbers: 'off', lineDecorationsWidth: 2, lineNumbersMinChars: 0, minimap: { enabled: false }, overviewRulerLanes: 0, renderLineHighlight: 'none', scrollbar: { horizontal: 'hidden', vertical: 'hidden' }, overviewRulerLanes: 0 }"
								:extensions="extensions" style="height: 100%; width: 100%;" />
						</div>
						<button type="button" class="btn btn-info" data-bs-toggle="offcanvas" href="#offcanvasExample"
							style="display: flex; align-items: center; padding: 0px 6px; margin-left: 10px;"
							@click="onFetchQuery"><i class="ri-filter-3-line align-bottom me-1"></i> Query</button>
					</div>
					<div class="col-sm-auto ms-auto">
						<div class="hstack gap-2">
							<button class="btn btn-danger" id="remove-actions" onclick="deleteMultiple()"><i
									class="ri-delete-bin-2-line"></i></button>
							<button type="button" class="btn btn-secondary " data-bs-toggle="modal"
								data-bs-target="#modalConfirm">
								Commit changes <i class="ri-arrow-right-line" style="position: relative; top: 2px;"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="card-body">
				<div>
					<div class="table-responsive table-card">
						<table class="table align-middle" id="customerTable" style="overflow-x: visible;">
							<thead class="table-light">
								<th>
									<div v-if="selectedItems.length > 0">
										<button type="button" class="btn btn-primary " data-bs-toggle="modal"
											data-bs-target="#myModal">View Selected Items</button>
									</div>
								</th>
								<vue-draggable v-model="headerFields" tag="tr" :item-key="(key) => key">	
										<template #item="{element}">
											<th scope="col" style="white-space: nowrap; text-align: center;" @click="setSortColumn(element)">
												<span>{{ headers.find((item) => item.key === element).label }}</span>
												<span v-if="sortColumn === element && sortDirection === 'ASC'">▲</span>
												<span v-else-if="sortColumn === element && sortDirection === 'DESC'">▼</span>
											</th>
										</template>
								</vue-draggable>
							</thead>

							<tbody>

								<template v-if="isLoading">
									<tr v-for="n in 10" :key="n">
										<td :style="{'white-space': 'nowrap', 'text-align': 'center'}" v-for="(header) in headerFields" :key="header">
											<Skeleton v-bind="skeletorSettings"></Skeleton>
										</td>
									</tr>
								</template>

								<tr v-for="(item, indexRow) in list" :key="item.id">
									<!-- <td style="white-space: nowrap; text-align: center;">
										<div class="form-check text-center">
											<input class="form-check-input fs-15" type="checkbox" :value="item"
												v-model="selectedItems">
										</div>
									</td> -->
									<!-- <td style="white-space: nowrap; text-align: center;"
										:key="review_candidateperson_dupes_id">{{ item.review_candidateperson_dupes_id }}
									</td> -->
									<td :style="{'white-space': 'nowrap', 'text-align': 'center', 'background-color': (highlightedColumn === indexColumn && highlightedRow === indexRow) && !editIntent ? '#f1faff' : 'transparent'}" v-for="(header, indexColumn) in headerFields" :key="header" @click="setHighlighted(indexColumn, indexRow)">
										<span style="cursor: default;" v-if="header === 'review_candidateperson_dupes_id'">{{ item.review_candidateperson_dupes_id }}</span>
										<span style="cursor: default;" v-else-if="header === 'created_date'">{{ item.created_date }}</span>
										<span style="cursor: default;" v-else-if="header === 'last_modified_date'">{{ item.last_modified_date }}</span>
										<span style="cursor: default;" v-else-if="header === 'is_deleted'">{{ item.is_deleted }}</span>
										<EditableCell :key="`${indexColumn}${indexRow}`" v-else :text="item[header]" :field="header"
											:id="item.review_candidateperson_dupes_id" :edit="(highlightedColumn === indexColumn && highlightedRow === indexRow) && editIntent" @edit="setEditing" />
									</td>
								</tr>
							</tbody>
						</table>

						<div class="d-flex justify-content-start m-3">
							<div class="pagination-wrap hstack gap-2" style="display: flex;">
								<a :class="{ 'page-item pagination-prev': true, 'disabled': pagination.page === 1 }"
									href="#" @click="onPreviousPage">
									Previous
								</a>
								<a :class="{ 'page-item pagination-next': true, 'disabled': pagination.page === pagination.last }"
									href="#" @click="onNextPage">
									Next
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
import "@/store/index.js";
import { ref, computed, watch, onMounted } from 'vue';
import EditableCell from "../components/EditableCell.vue";
import { set, get, onKeyStroke } from '@vueuse/core'
import { Codemirror } from 'vue-codemirror'
import { sql, SQLDialect } from '@codemirror/lang-sql'
import VueDraggable from 'vuedraggable'
import store from "@/store/index.js";
import MainHeader from "@/components/core/MainHeader.vue";
import MainNav from '@/components/core/MainNav.vue';
import Skeleton from 'vue-skeletor';



const selectedItems = ref([]);
const code = ref('')


const isLoading = computed(() => store.state.isLoading);

const skeletorSettings = ref({
	type: 'rect',
	width: '100%',
	height: '10px',
	animation: 'wave',
})


const headers = ref([
	{
		key: 'review_candidateperson_dupes_id',
		label: 'ID'
	},
	{
		key: 'personid',
		label: 'Person ID'
	},
	{
		key: 'masterpersonid',
		label: 'Master Person ID'
	},
	{
		key: 'name',
		label: 'Name'
	},
	{
		key: 'reportedname',
		label: 'Reported Name'
	},
	{
		key: 'gender',
		label: 'Gender'
	},
	{
		key: 'street',
		label: 'Street'
	},
	{
		key: 'street_2',
		label: 'Street 2'
	},
	{
		key: 'city',
		label: 'City'
	},
	{
		key: 'state',
		label: 'State'
	},
	{
		key: 'zip',
		label: 'Zip'
	},
	{
		key: 'electionyear',
		label: 'Election Year'
	},
	{
		key: 'electiontype',
		label: 'Election Type'
	},
	{
		key: 'office',
		label: 'Office'
	},
	{
		key: 'district',
		label: 'District'
	},
	{
		key: 'status',
		label: 'Status'
	},
	{
		key: 'incumbency',
		label: 'Incumbency'
	},
	{
		key: 'party',
		label: 'Party'
	},
	{
		key: 'mark',
		label: 'Mark'
	},
	{
		key: 'candidatestatus',
		label: 'Candidate Status'
	},
	{
		key: 'created_date',
		label: 'Created Date'
	},
	{
		key: 'last_modified_date',
		label: 'Last Modified Date'
	},
	{
		key: 'last_modified_by',
		label: 'Last Modified By'
	},
	{
		key: 'is_deleted',
		label: 'Is Deleted'
	}
])

const headerFields = ref(get(headers).map((header) => header.key))

const sortColumn = ref(null)
const sortDirection = ref(null)
const highlightedColumn = ref(null)
const highlightedRow = ref(null)
const editIntent = ref(false)
const editing = ref(false)

const extensions = [sql({
	dialect: SQLDialect.define({
		keywords: 'where and or like in not is null',
		types: 'candidatestatus city created_date district electiontype electionyear gender incumbency is_deleted last_modified_by last_modified_date mark masterpersonid name office party personid reportedname state status street street_2 zip'
	})
})]

onKeyStroke(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], ({key}) => {
	if (!get(editing)) {
		set(editIntent, false)
		if (get(highlightedColumn) === null || get(highlightedRow) === null) {
			set(highlightedColumn, 0)
			set(highlightedRow, 0)
		} else {
			set(highlightedColumn, get(highlightedColumn) + (key === 'ArrowLeft' ? get(highlightedColumn) > 0 ? -1 : 0 : key === 'ArrowRight' ? get(headers).length - 1 === get(highlightedColumn) ? 0 : 1 : 0))
			set(highlightedRow, get(highlightedRow) + (key === 'ArrowUp' ? get(highlightedRow) > 0 ? -1 : 0 : key === 'ArrowDown' ? get(list).length - 1 === get(highlightedRow) ? 0 : 1 : 0))
		}
	}
})

onKeyStroke('Enter', () => {
	set(editIntent, get(highlightedColumn) !== null && get(highlightedRow) !== null)
})

onKeyStroke('Escape', () => {
	if (get(editing)) {
		set(editIntent, false)
	} else {
		set(editIntent, false)
		if (get(editIntent) === false) {
			set(highlightedColumn, null)
			set(highlightedRow, null)
		}
	}
})

const resetNavigation = () => {
	set(highlightedColumn, null)
	set(highlightedRow, null)
	set(editIntent, false)
	set(editing, false)
}

const list = computed(() => {
	return store.getters.getData
})

const pagination = computed(() => {
	return store.getters.getPagination
})

watch(sortDirection, (newVal) => {
	if (newVal === null) {
		store.dispatch('setSort', null)
	} else {
		store.dispatch('setSort', { column: this.sortColumn, direction: newVal })
	}
	resetNavigation()
})

watch(editIntent, (val) => {
	if (val === false) {
		set(editing, false)
	}
})

watch(editing, (newVal, oldVal) => {
	if (newVal === true && oldVal === false) {
		set(editIntent, true)
	}
})

onMounted(() => {
	store.dispatch('fetchData')
})

const setEditing = (value) => {
	if (typeof value !== 'undefined') {
		set(editing, value)
	}
}

const setHighlighted = (column, row) => {
	set(editIntent, false)
	set(highlightedColumn, column)
	set(highlightedRow, row)
}

const setSortColumn = (column) => {
	if (get(sortColumn) === column) {
		if (get(sortDirection) === 'ASC') {
			set(sortDirection, 'DESC')
		} else if (get(sortDirection) === 'DESC') {
			set(sortDirection, null)
		} else {
			set(sortDirection, 'ASC')
		}
	} else {
		set(sortColumn, column)
		set(sortDirection, 'ASC')
	}
}

const onFetchQuery = (query) => {
	store.dispatch('fetchQuery', query)
	resetNavigation()
}

const onNextPage = () => {
	store.dispatch('nextPage')
	resetNavigation()
}

const onPreviousPage = () => {
	store.dispatch('previousPage')
	resetNavigation()
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>tr:nth-child(even) {
	background-color: #eee;
}</style>
