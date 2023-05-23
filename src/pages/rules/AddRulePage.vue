<template>
	<MainHeader />
	<MainNav />


	<div id="myModal" class="modal fade modal-lg" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="myModalLabel">Add requeriment</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="col-6">
						<div class="form-group">
							<label for="">Title</label>
							<input type="text" class="form-control">
						</div>
					</div>
					
					<div class="border border-2 rounded mt-4 p-3">
						<h6>This rule applies when</h6>
						<div class="row align-items-center mb-4">
							<div class="col">
								<select name="" id="" class="form-select">
									<option value="">all</option>
								</select>
							</div>
							<div class="col-4">
								<p>of the following are true</p>
							</div>
							<div class="col-4 text-right">
								<i class='bx bx-plus h4 text-right'></i>
							</div>
						</div>

						<div class="row px-4 align-items-center">
							<div class="col">
								<select name="" id="" class="form-select">
									<option value="">Web address</option>
								</select>
							</div>

							<div class="col">
								<select name="" id="" class="form-select">
									<option value="">Contains</option>
								</select>
							</div>
							<div class="col">
								<input type="text" class="form-control">
							</div>

							<div class="col">
								<div class="col-4 text-right">
									<i class='bx bx-plus h4 text-right'></i>
								</div>
							</div>
						</div>
					</div>

					<div class="border border-2 rounded mt-4 p-3">
						<h6>When this rule applies, Choosy should</h6>

						<select name="" id="" class="form-select mb-2">
							<option value="">Use the default behaviour</option>
						</select>

						<p class="text-muted">Choosy will behave as if no rules matches</p>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-primary ">Ok</button>
				</div>

			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->


	<div class="offcanvas offcanvas-end border-0" tabindex="-1" id="rules-offcanvas">
		<div class="d-flex align-items-center bg-primary p-3 offcanvas-header">
			<h5 class="m-0 me-2 text-white">Rule Details</h5>
			<button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body p-0">
			<div data-simplebar class="h-100">
				<div class="p-4">
					<h6>Lorem</h6>
					<p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, dolores ex id voluptatum molestias dolor aut tempora vitae, nihil ipsam placeat perferendis incidunt eius sint consequatur, enim temporibus laudantium commodi.</p>
					<ul>
						<li>Lorem, ipsum.</li>
						<li>Lorem, ipsum. Lorem.</li>
						<li>Lorem, ipsum. Lorem.</li>
						<li>Lorem, </li>
					</ul>
				</div>
			</div>
		</div>
		<div class="offcanvas-footer border-top p-3 text-center">
			<div class="row">
				<div class="col-6">
					<button type="button" class="btn btn-light w-100" data-bs-dismiss="offcanvas">Cancel</button>
				</div>
				<div class="col-6">
					<button class="btn btn-primary w-100" data-bs-dismiss="offcanvas">Save</button>
				</div>
			</div>
		</div>
	</div>

	<div class="container mt-4">
		<div class="card">
			<div class="card-body">
				<div class="mb-4">
					<button type="button"  class="btn d-block btn-primary mt-2 ms-auto" data-bs-toggle="modal" data-bs-target="#myModal">New Requirement</button>
				</div>

				<div class="table-responsive table-card">
					<table class="table align-middle" id="customerTable" style="overflow-x: visible;">
						<thead>
							<tr>
								<th></th>
								<th></th>
								<th>
									<select class="form-control choices__input choices__list choices__list--multiple" v-multi-choices multiple placeholder="oscar">
										<option value="1">Any DataType</option>
										<option value="2">Any DataType 2</option>
										<option value="3">Any DataType 3</option>
									</select>
								</th>
								<th></th>
								<th></th>
								<th>
									<select class="form-control choices__input choices__list choices__list--multiple" v-multi-choices multiple>
										<option value="1">All Jurisdictions</option>
										<option value="2">All Jurisdictions 2</option>
										<option value="3">All Jurisdictions 3</option>
									</select>
								</th>
								<th></th>
							</tr>
						</thead>
						<thead>
							<tr>
								<th scope="col"></th>
								<th scope="col">
									Rule ID
								</th>
								<th scope="col">Search Field</th>
								<th scope="col">
									Comparison
								</th>
								<th scope="col">Value</th>
								<th scope="col">
									Jurisdictions
								</th>
								<th scope="col"></th>
								<th scope="col">Industry Code</th>
							</tr>
						</thead>
						
						<draggable 
							:list="items"
							:item-key="(key) => key"
							tag="tbody"	
						>
							<template #item="{ element }">
								<tr class="align-top cursor-pointer" >
									<td scope="row">
										<div class="row">
											<div class="col-6" data-bs-toggle="offcanvas" data-bs-target="#rules-offcanvas" aria-controls="rules-offcanvas">
												<i class='bx bxs-edit h5 '></i>
											</div>
										</div>
									</td>
									<td>
										<h6  class="cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#rules-offcanvas" aria-controls="rules-offcanvas">
											{{ element.id }}
										</h6>
									</td>
									
									<td>
										<select class="form-control choices__input" v-choices>
											<option value="">Name</option>
										</select>
									</td>
									<td>
										<select class="form-control choices__input" v-choices>
											<option value="">Contains</option>
										</select>
									</td>

									<td>
										<select class="form-control choices__input" v-choices>
											<option value="">AT&T</option>
										</select>
									</td>

									<td>
										<select class="form-control choices__input" v-choices>
											<option value="">All - Jurisdictions</option>
										</select>
										<button type="button" v-if="element.id == 2" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal">Save requirement</button>
									</td>

									<td class="align-items-center text-center">
										<span class="h2"> = </span>		
									</td>

									<td>
										<select class="form-control choices__input" v-choices>
											<option value="64">527:BAL</option>
											<option value="60">527:CC</option>
											<option value="57">527:DIR</option>
											<option value="59">527:E</option>
											<option value="69">527:EH</option>
											<option value="58">527:I</option>
											<option value="61">527:L</option>
											<option value="62">527:LR</option>
											<option value="67">527:NONC</option>
											<option value="68">527:OTH</option>
											<option value="65">527:PUB</option>
											<option value="63">527:RETU</option>
											<option value="70">527:TEST</option>
											<option value="71">527:TRANS</option>
											<option value="66">527:UI</option>
											<option value="8">BAL</option>
											<option value="4">CC</option>
											<option value="1">DIR</option>
											<option value="3">E</option>
											<option value="18">EC</option>
											<option value="13">EH</option>
											<option value="74">EXP:BRDCST</option>
											<option value="82">EXP:CONSULT</option>
											<option value="73">EXP:CONTRB</option>
											<option value="79">EXP:DM</option>
											<option value="87">EXP:FR</option>
											<option value="80">EXP:GOTV</option>
											<option value="75">EXP:INTERNET</option>
											<option value="84">EXP:LR</option>
											<option value="86">EXP:OTHADMIN</option>
											<option value="77">EXP:OTHMEDIA</option>
											<option value="81">EXP:POLL</option>
											<option value="76">EXP:PRINT</option>
											<option value="85">EXP:RETU</option>
											<option value="83">EXP:SALWAGE</option>
											<option value="78">EXP:UNIDENT</option>
											<option value="88">EXP:UNITEM</option>
											<option value="89">EXP:UNK</option>
											<option value="2">I</option>
											<option value="17">IE</option>
											<option value="90">JFC</option>
											<option value="5">L</option>
											<option value="54">LBYC:BOTH</option>
											<option value="53">LBYC:EXEC</option>
											<option value="52">LBYC:LEG</option>
											<option value="56">LBYC:NEI</option>
											<option value="55">LBYC:UNK</option>
											<option value="49">LBYL:BOTH</option>
											<option value="48">LBYL:EXEC</option>
											<option value="47">LBYL:LEG</option>
											<option value="51">LBYL:NEI</option>
											<option value="50">LBYL:UNK</option>
											<option value="32">LD:ACTV</option>
											<option value="34">LD:COMP</option>
											<option value="33">LD:GEN</option>
											<option value="35">LD:MULTI</option>
											<option value="36">LD:OTH</option>
											<option value="38">LD:SUBC</option>
											<option value="41">LDT:BB</option>
											<option value="44">LDT:BULK</option>
											<option value="40">LDT:CMTE</option>
											<option value="43">LDT:MISC</option>
											<option value="42">LDT:NONE</option>
											<option value="39">LDT:PERS</option>
											<option value="6">LR</option>
											<option value="11" selected="">NONC</option>
											<option value="12">OTH</option>
											<option value="9">PUB</option>
											<option value="72">PUBR</option>
											<option value="7">RETU</option>
											<option value="91">SUB</option>
											<option value="27">T:BB</option>
											<option value="30">T:BULK</option>
											<option value="46">T:CMTE</option>
											<option value="29">T:MISC</option>
											<option value="28">T:NONE</option>
											<option value="26">T:PERS</option>
											<option value="14">TEST</option>
											<option value="15">TRANS</option>
											<option value="10">UI</option>
											<option value="16">UNK</option>
											<option value="19">Z9</option>
										</select>
									</td>
								</tr>
							</template>
						</draggable>
						
					</table>

					<div class="d-flex justify-content-start m-3">
						<div class="pagination-wrap hstack gap-2 flex">
							<a class="page-item pagination-prev"
								href="#">
								Previous
							</a>
							<a class="page-item pagination-next"
								href="#">
								Next
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>



<script setup>
	import draggable from 'vuedraggable';
	import MainHeader from '@/components/core/MainHeader.vue';
	import MainNav from '@/components/core/MainNav.vue';
	import {ref} from 'vue'

	const items = ref([
		{ id: 1, name: 'Item 1' },
		{ id: 2, name: 'Item 2' },
		{ id: 3, name: 'Item 3' },
		{ id: 4, name: 'Item 4' },
		{ id: 5, name: 'Item 5' },
	])
</script>