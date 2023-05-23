<template>
	<MainHeader />
	<MainNav />
	
	<div class="container mt-4">
		
		<div class="col-12">
			<div class="card">
				<div class="card-body checkout-tab">
					<Form ref="form" @submit="onSubmit" v-slot="{ errors }">
						
						<div class="step-arrow-nav mt-n3 mx-n3 mb-3">
							<ul class="nav nav-pills nav-justified custom-nav" role="tablist">
								<li class="nav-item" role="presentation">
									<button :class="{ 'nav-link fs-15 p-3': true, 'active': step === 'information' }"
									id="pills-bill-info-tab" data-bs-toggle="pill" data-bs-target="#pills-bill-info"
									type="button" role="tab" aria-controls="pills-bill-info" aria-selected="true"
									@click="setStep('information')"><i
									class="ri-user-2-line fs-16 p-2 bg-soft-primary text-primary rounded-circle align-middle me-2"></i>
									Candidate Information</button>
								</li>
								<li class="nav-item" role="presentation">
									<button :class="{ 'nav-link fs-15 p-3': true, 'active': step === 'demographics' }"
									id="pills-bill-address-tab" data-bs-toggle="pill"
									data-bs-target="#pills-bill-address" type="button" role="tab"
									aria-controls="pills-bill-address" aria-selected="false"
									@click="setStep('demographics')"><i
									class="ri-earth-line fs-16 p-2 bg-soft-primary text-primary rounded-circle align-middle me-2"></i>
									Candidate Demographics</button>
								</li>
								<li class="nav-item" role="presentation">
									<button :class="{ 'nav-link fs-15 p-3': true, 'active': step === 'election' }"
									id="pills-payment-tab" data-bs-toggle="pill" data-bs-target="#pills-payment"
									type="button" role="tab" aria-controls="pills-payment" aria-selected="false"
									@click="setStep('election')"><i
									class="ri-chat-poll-line fs-16 p-2 bg-soft-primary text-primary rounded-circle align-middle me-2"></i>
									Election Information</button>
								</li>
								
								<li class="nav-item" role="presentation">
									<button :class="{ 'nav-link fs-15 p-3': true, 'active': step === 'review' }"
									id="pills-payment-tab" data-bs-toggle="pill" data-bs-target="#pills-payment"
									type="button" role="tab" aria-controls="pills-payment" aria-selected="false"
									@click="setStep('review')"><i
									class="ri-checkbox-circle-line fs-16 p-2 bg-soft-primary text-primary rounded-circle align-middle me-2"></i>
									Review</button>
								</li>
							</ul>
						</div>
						
						<div class="tab-content">
							<div v-show="step === 'information'" class="tab-pane fade show active" id="pills-bill-info"
							role="tabpanel" aria-labelledby="pills-bill-info-tab">
							
							<div>
								<div class="border card" style="box-shadow: none;">
									<div class="row" style="padding: 12px;">
										<div>
											<h5 class="mb-1">Basic information</h5>
											<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
										</div>
										<div class="col-sm-2">
											<div class="mb-3">
												<label class="form-label">Prefix</label>
												
												<template v-if="isLoadingStep1">
													<Skeletor height="40" />
												</template>
												<template v-else>
													<SelectChoices  name="prefix" :options="data[0]?.prefix_values" />
												</template>
												
											</div>
										</div>
										
										<div class="col-sm-3">
											<div class="mb-3">
												<label  name="first-name" class="form-label">First Name *</label>
												<Field type="text" class="form-control" placeholder="Enter first name" name="firstName" :rules="required" />
											</div>
										</div>
										
										<div class="col-sm-2">
											<div class="mb-3">
												<label  class="form-label">Middle Name</label>
												<Field type="text" class="form-control" placeholder="Enter first name" name="middelName"/>
											</div>
										</div>
										
										<div class="col-sm-3">
											<div class="mb-3">
												<label  class="form-label">LastName *</label>
												<Field type="text" class="form-control" placeholder="Enter first name" name="lastName" :rules="required"/>
											</div>
										</div>
										
										<div class="col-sm-2">
											<div class="mb-3">
												<label  class="form-label">Suffix</label>
												<Field type="text" class="form-control" placeholder="Enter suffix" name="suffix" />
											</div>
										</div>
									</div>
								</div>
								
								<div class="border card" style="box-shadow: none;">
									<div class="row" style="padding: 12px;">
										<div>
											<h5 class="mb-1">Contact information</h5>
											<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
										</div>
										<div class="col-md-5">
											<div class="mb-3">
												<label  class="form-label">Address 1</label>
												<Field type="text" class="form-control"  name="address1" />
											</div>
										</div>
										
										<div class="col-md-3">
											<div class="mb-3">
												<label  class="form-label">City</label>
												<Field type="text" class="form-control" name="city" />
											</div>
										</div>
										
										<div class="col-md-4">
											<div class="mb-3">
												<label class="form-label">State</label>
												
												<template v-if="isLoadingStep1">
													<Skeletor height="40" />
												</template>
												<template v-else>
													<SelectChoices  name="state" :options="data[0]?.states_values" />
												</template>
											</div>
										</div>
										
										<div class="col-md-5">
											<div class="mb-3">
												<label  class="form-label">Address 2</label>
												<Field type="text" class="form-control" name="address2"  />
											</div>
										</div>
										
										<div class="col-md-3">
											<div class="mb-3">
												<label class="form-label">Zipcode</label>
												<Field type="text" class="form-control" name="zipcode"  />
											</div>
										</div>
										
										<div class="col-md-4">
											<div class="mb-3">
												<label  class="form-label">Nick Name</label> 
												<Field type="text" class="form-control" name="nickName"  />
											</div>
										</div>
									</div>
								</div>
								
								<div class="border card" style="box-shadow: none;">
									<div class="row" style="padding: 12px;">
										<div>
											<h5 class="mb-1">Party information</h5>
											<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
										</div>
										
										<div class="col-sm-3">
											<div class="mb-3">
												<label class="form-label">Party Affiliation</label>
												
												<template v-if="isLoadingStep1">
													<Skeletor height="40" />
												</template>
												<template v-else>
													<SelectChoices  name="affiliation" :options="data[0]?.party_affiliation_values" />
												</template>
											</div>
										</div>
										
										<div class="col-sm-3">
											<div class="mb-3">
												<label class="form-label">Commitee ID</label> 
												<Field type="text" class="form-control" name="commiteeId"  />
											</div>
										</div>
										
										<div class="col-sm-3">
											<div class="mb-3">
												<label class="form-label">Candidicy ID *</label>
												<Field type="text" class="form-control" name="candidicyId"/>
											</div>
										</div>
										
										<div class="col-sm-3">
											<div class="mb-3">
												<label  class="form-label">Website</label>
												<Field type="text" class="form-control" name="website"  />
											</div>
										</div>
										
										<div class="col-sm-3">
											<div class="mb-3">
												<label class="form-label">PACs?</label>
												<Field
												as="select"
												name="pacs"
												:class="{ 'form-select': true, 'is-invalid': errors.prefix }"
												class="form-select"
												> 
												<option value="yes">Yes</option>
												<option value="no">No</option>
											</Field>
										</div>
									</div>
									
									<div class="col-sm-3">
										<div class="mb-3">
											<label class="form-label">Occupation</label>
											<Field type="text" class="form-control" name="occupation"  />
										</div>
									</div>
									
									
									<div class="col-sm-3">
										<div class="mb-3">
											<label  class="form-label">Phone</label>
											<Field type="number" class="form-control" name="phone"  />
										</div>
									</div>
									
									<div class="col-sm-3">
										<div class="mb-3">
											<label  class="form-label">Fax</label>
											<Field type="text" class="form-control" name="fax"  />
										</div>
									</div>
								</div>
							</div>
							
							<div class="d-flex align-items-start gap-3 mt-3">
								<button type="button" @click="setStep('demographics')" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="pills-bill-address-tab">
									<i class="ri-earth-line label-icon align-middle fs-16 ms-2"></i>Proceed
									to Demographics
								</button>
							</div>
						</div>
					</div>
					<!-- end tab pane step-1 -->
					
					<div v-show="step === 'demographics'" class="tab-pane fade show active" id="pills-bill-address" role="tabpanel" aria-labelledby="pills-bill-address-tab">
						<div class="border card" style="box-shadow: none;">
							<div class="row" style="padding: 12px;">
								<div>
									<h5 class="mb-1">Demographics details</h5>
									<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
								</div>
								<div class="col-sm-2">
									<div class="mb-3">
										<label class="form-label">Gender</label>
										<template v-if="isLoadingStep2">
											<Skeletor height="40" />
										</template>
										<template v-else>
											<SelectChoices  name="gender" :options="data[1]?.gender_values" />
										</template>
									</div>
								</div>
								
								<div class="col-sm-2">
									<div class="mb-3">
										<label class="form-label">Race</label>
										<template v-if="isLoadingStep2">
											<Skeletor height="40" />
										</template>
										<template v-else>
											<SelectChoices  name="race" :options="data[1]?.race_values" />
										</template>
									</div>
								</div>
								
								<div class="col-sm-2">
									<div class="mb-3">
										<label class="form-label">Race 2</label>
										
										<template v-if="isLoadingStep2">
											<Skeletor height="40" />
										</template>
										<template v-else>
											<SelectChoices  name="race2" :options="data[1]?.race_values" />
										</template>
									</div>
								</div>
								
								<div class="col-sm-3">
									<div class="mb-3" style="display: flex; flex-direction: column;">
										<label class="form-label">LGBTQ</label>
										<div class="btn-group block" role="group" aria-label="Basic radio toggle button group">
											<RadioButton name="lgbtq" label="lgbtq" :options="lgbtqOptions" :rules="['required']" />											
										</div>
									</div>
								</div>
								
								<div class="col-sm-2">
									<div class="mb-3">
										<label class="form-label">Generation</label>
										
										<template v-if="isLoadingStep2">
											<Skeletor height="40" />
										</template>
										<template v-else>
											<SelectChoices  name="generation" :options="data[1]?.generation_values" />
										</template>
									</div>
								</div>
								
							</div>
						</div>
						
						<div class="border card" style="box-shadow: none;">
							<div class="row" style="padding: 12px;">
								<div>
									<h5 class="mb-1">Demographic groups</h5>
									<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
								</div>
								<div class="col-6">
									<div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
										<check-box v-for="option in genderOptions" :key="option.value" :name="option.value.toLowerCase()" label="Gender" :option="option" />
									</div>
								</div>
							</div>
						</div>
						
						<div class="border card" style="box-shadow: none;">
							<div class="row" style="padding: 12px;">
								<div>
									<h5 class="mb-1">Politic details</h5>
									<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
								</div>
								<div class="col-sm-3">
									<div class="mb-3">
										<label  class="form-label">Party 1</label>
										
										<template v-if="isLoadingStep2">
											<Skeletor height="40" />
										</template>
										<template v-else>
											<SelectChoices  name="party1" :options="data[1]?.party_1_values" />
										</template>
									</div>
								</div>
								
								<div class="col-sm-3">
									<div class="mb-3">
										<label  class="form-label">Party 3</label>
										
										<template v-if="isLoadingStep2">
											<Skeletor height="40" />
										</template>
										<template v-else>
											<SelectChoices  name="party3" :options="data[1]?.party_3_values" />
										</template>
									</div>
								</div>
							</div>
						</div>
						
						
						<div class="d-flex align-items-start gap-3 mt-4">
							<button type="button" @click="setStep('information')" class="btn btn-light btn-label previestab" data-previous="pills-bill-info-tab">
								<i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
								Back to Candidate Info
							</button>
							
							<button type="button" @click="setStep('election')" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="pills-payment-tab"><i class="ri-chat-poll-line label-icon align-middle fs-16 ms-2"></i>Continue
								to Election
							</button>
						</div>
					</div>
					<!-- end tab pane step-2 -->
					
					<div v-show="step === 'election'" class="tab-pane fade show active" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab">
						<div class="border card" style="box-shadow: none;">
							<div class="row" style="padding: 12px;">
								<div>
									<h5 class="mb-1">Election details</h5>
									<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
								</div>
								<div class="col-sm-3">
									<div class="mb-3">
										<label class="form-label">Election year *</label>
										<Field
										as="select"
										name="electionYear"
										:class="{ 'form-select': true, 'is-invalid': errors.prefix }"
										class="form-select"
                    :rules="required"
										>
										<option v-for="year in years" :key="year" :value="year">{{ year }}</option>
									</Field>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Source Jurisdiction</label>
									
									<template v-if="isLoadingStep3">
										<Skeletor height="40" />
									</template>
									<template v-else>
										<SelectChoices  name="jurisdictionSource" :options="data[2]?.jurisdiction_values" />
									</template>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Election Jurisdiction *</label>
									
									<template v-if="isLoadingStep3">
										<Skeletor height="40" />
									</template>
									<template v-else>
										<SelectChoices  name="jurisdictionElection" :options="data[2]?.jurisdiction_values" />
									</template>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Election Type *</label>
									
									<template v-if="isLoadingStep3">
										<Skeletor height="40" />
									</template>
									<template v-else>
										<SelectChoices  name="electionType" :options="data[2]?.election_type_values" />
									</template>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Race Type *</label>
									
									<template v-if="isLoadingStep3">
										<Skeletor height="40" />
									</template>
									<template v-else>
										<SelectChoices  name="raceType" :options="data[2]?.race_type_values" />
									</template>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Office *</label>
                  <Field type="text" class="form-control" v-model="office" name="office" :rules="required"/>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label  class="form-label">District *</label>

                  <Field type="text" class="form-control" v-model="district" name="district" :rules="required" />
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label  class="form-label">Seat *</label>
									<Field type="text"  class="form-control"  name="seat" :rules="required" />
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Event Type *</label>
									
									<template v-if="isLoadingStep3">
										<Skeletor height="40" />
									</template>
									<template v-else>
										<SelectChoices  name="eventType" :options="data[2]?.event_type_values" />
									</template>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Incumbency *</label>
									
									<template v-if="isLoadingStep3">
										<Skeletor height="40" />
									</template>
									<template v-else>
										<SelectChoices  name="incumbency" :options="data[2]?.incumbency_values" />
									</template>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="mb-3">
									<label class="form-label">Election Status *</label>
									
									<template v-if="isLoadingStep3">
										<Skeletor height="40" />
									</template>
									<template v-else>
										<SelectChoices  name="electionStatus" :options="data[2]?.election_status_values" />
									</template>
								</div>
							</div>
							
						</div>
					</div>
					
					
					<div class="border card" style="box-shadow: none;">
						<div class="row" style="padding: 12px;">
							<div>
								<h5 class="mb-1">Additional details</h5>
								<p class="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur.</p>
							</div>
							<div class="mb-3">
								<label  class="form-label">Comments</label>
								<Field type="text" as="textarea"  class="form-control" rows="3"  name="comments" />
							</div>
						</div>
					</div>
					
					
					<div class="d-flex align-items-start gap-3 mt-4">
						<button type="button" @click="setStep('demographics')"
						class="btn btn-light btn-label previestab" data-previous="pills-bill-address-tab"><i
						class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back
						to Demographics</button>
						<button type="button" @click="setStep('review')"
						class="btn btn-primary btn-label right ms-auto nexttab"
						data-nexttab="pills-finish-tab"><i
						class="ri-checkbox-circle-line label-icon align-middle fs-16 ms-2"></i>Review
						data</button>
					</div>
				</div>
				<!-- end tab pane -->
				
				<div v-show="step === 'review'" class="tab-pane fade show active" id="pills-bill-info" role="tabpanel" aria-labelledby="pills-bill-info-tab">
					<div>
						<h5 class="mb-1">Form Information</h5>
						<p class="text-muted mb-4">Please ensure the information entered is correct before
							saving
							the candidate</p>
						</div>
						
						<div class="accordion" id="accordionExample">
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button" type="button" data-bs-toggle="collapse"
									data-bs-target="#collapseOne" aria-expanded="true"
									aria-controls="collapseOne">
									Candidate information
								</button>
							</h2>
							<div id="collapseOne" class="accordion-collapse  show" data-bs-parent="#accordionExample">
								<div class="accordion-body" v-if="formValues">																
									
									<table>
										<tr class="border-bottom">
											<td>Prefix:</td>
											<td>{{ formValues?.prefix }}</td>
										</tr>
										<tr class="border-bottom">
											<td>First name:</td>
											<td>{{ formValues?.firstName }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Last name:</td>
											<td>{{ formValues?.lastName }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Suffix:</td>
											<td>{{ formValues?.suffix }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Address 1:</td>
											<td>{{ formValues?.address1 }}</td>
										</tr>
										<tr class="border-bottom">
											<td>City:</td>
											<td>{{ formValues?.city }}</td>
										</tr>
										<tr class="border-bottom">
											<td>State:</td>
											<td>{{ formValues?.state }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Address 2:</td>
											<td>{{ formValues?.address2 }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Zipcode:</td>
											<td>{{ formValues?.zipcode }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Nick name:</td>
											<td>{{ formValues?.nickName }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Party affiliation:</td>
											<td>{{ formValues?.affiliation }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Commitee ID:</td>
											<td>{{ formValues?.commiteeId }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Candidicy ID:</td>
											<td>{{ formValues?.candidicyId }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Website:</td>
											<td>{{ formValues?.website }}</td>
										</tr>
										<tr class="border-bottom">
											<td>PACs?:</td>
											<td>{{ formValues?.pacs }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Occupation:</td>
											<td>{{ formValues?.occupation }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Phone:</td>
											<td>{{ formValues?.phone }}</td>
										</tr>
										<tr class="border-bottom">
											<td>Fax:</td>
											<td>{{ formValues?.fax }}</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="accordion-item">
							<h2 class="accordion-header">
								<button class="accordion-button collapsed" type="button"
								data-bs-toggle="collapse" data-bs-target="#collapseTwo"
								aria-expanded="false" aria-controls="collapseTwo">
								Candidate demographics
							</button>
						</h2>
						<div id="collapseTwo" class="accordion-collapse"
						data-bs-parent="#accordionExample">
						<div class="accordion-body" v-if="formValues">
							<table>
								<tr class="border-bottom">
									<td>Gender:</td>
									<td>{{ formValues?.gender }}</td>
								</tr>
								<tr class="border-bottom">
									<td>Race:</td>
									<td>{{ formValues?.race }}</td>
								</tr>
								<tr class="border-bottom">
									<td>Race 2:</td>
									<td>{{ formValues?.race2 }}</td>
								</tr>
								<tr class="border-bottom">
									<td>LGBTQ:</td>
									<td>{{ formValues?.lgbtq }}</td>
								</tr>
								<tr class="border-bottom">
									<td>Demographic groups:</td>
									<td>{{ `${formValues?.poc ? 'POC ' : ''}${formValues?.veteran ? 'Veteran ' : ''}${formValues?.white ? 'White ' : ''}${formValues?.immigrant ? 'Immigrant ' : ''}${formValues?.latino ? 'Latino ' : ''}${formValues?.mena ? 'MENA ' : ''}` }}</td>
								</tr>
								<tr class="border-bottom">
									<td>Generation:</td>
									<td>{{ formValues?.generation }}</td>
								</tr>
								<tr class="border-bottom">
									<td>Party 1:</td>
									<td>{{ formValues?.Party }}</td>
								</tr>
								<tr class="border-bottom">
									<td>Party 3:</td>
									<td>{{ formValues?.Party }}</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button"
						data-bs-toggle="collapse" data-bs-target="#collapseThree"
						aria-expanded="false" aria-controls="collapseThree">
						Election Information
					</button>
				</h2>
				<div id="collapseThree" class="accordion-collapse" data-bs-parent="#accordionExample">
					<div class="accordion-body" v-if="formValues">
						<table>
							<tr class="border-bottom">
								<td>Election year:</td>
								<td>{{ formValues.electionYear }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Source Jurisdiction:</td>
								<td>{{ formValues.jurisdictionSource }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Election Jurisdiction:</td>
								<td>{{ formValues.jurisdictionElection }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Election Type:</td>
								<td>{{ formValues.electionType }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Race Type:</td>
								<td>{{ formValues.raceType }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Office:</td>
								<td>{{ formValues.office }}</td>
							</tr>
							<tr class="border-bottom">
								<td>District:</td>
								<td>{{ formValues.district }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Seat:</td>
								<td>{{ formValues.seat }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Event Type:</td>
								<td>{{ formValues.eventType }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Incumbency:</td>
								<td>{{ formValues.incumbency }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Election status:</td>
								<td>{{ formValues.electionStatus }}</td>
							</tr>
							<tr class="border-bottom">
								<td>Comments:</td>
								<td>{{ formValues.comments }}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		
		<div class="d-flex align-items-start gap-3 mt-4">
			<button type="button" @click="setStep('election')"
			class="btn btn-light btn-label previestab" data-previous="pills-bill-address-tab"><i
			class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back
			to Election</button>
			<button type="button" @click="preSubmit" :disabled="isLoading" class="btn btn-primary btn-label right ms-auto nexttab"
			data-nexttab="pills-finish-tab"><i
			class="ri-save-line label-icon align-middle fs-16 ms-2"></i> {{ isLoading ? 'Saving' : 'Save Candidate' }}</button>
		</div>
	</div>
</div>
<!-- end tab content -->
</form>
</div>
<!-- end card body -->
</div>
<!-- end card -->
</div>
</div>

</template>

<script setup>
import { useStore } from 'vuex';
import MainHeader from '@/components/core/MainHeader.vue';
import MainNav from '@/components/core/MainNav.vue';
import {computed, ref, onMounted} from 'vue';
import { Form, Field } from 'vee-validate';
import SelectChoices from '@/components/SelectChoices.vue';
import RadioButton from '@/components/RadioButton.vue';
import CheckBox from '@/components/CheckBox.vue';
import {required} from '@vee-validate/rules';
import {defineRule} from 'vee-validate';
import axios from 'axios';
import Swal from 'sweetalert2'
import {useMutation} from '@tanstack/vue-query'

defineRule('required', required)

const form = ref(null);

const store = useStore();
const step = ref('information');

let years = ref([...new Array(150).keys()].map((year) => year + 1900));

const setStep = (value) => {
	step.value = value;
	if(value === "review") {
		formValues.value = form.value.getValues();
	}
};

const data = computed(() => {
	return store.getters.getValues;
});

const isLoadingStep1 = computed(() => {
	return store.getters.isLoadingStep1;
});

const isLoadingStep2 = computed(() => {
	return store.getters.isLoadingStep2;
});

const isLoadingStep3 = computed(() => {
	return store.getters.isLoadingStep3;
});

onMounted(() => {
	store.dispatch('fetchAllValues');
});

const formValues = ref(null);

const preSubmit = () => {
	onSubmit(form.value.getValues())
}

const {mutateAsync: saveCandidate, isLoading } = useMutation({
	mutationFn: async (formData) => {
		return await axios.post(`${process.env.VUE_APP_API_URL}/file_upload`, formData)
	}
})

const onSubmit = async (values) => {
	const formData = new FormData();

	formData.append('data_file', generateFile(values));
	formData.append('data_type', 'Candidates');
	formData.append('jurisdiction', values.jurisdictionElection);
	formData.append('year', values.electionYear);
	const response = await saveCandidate(formData);
	if (response.data.success === true) {
		setStep('information')
		Swal.fire({
			title: 'Success!',
			icon: 'success',
		})
	} else {
		Swal.fire({
			title: response.data.message,
			icon: 'error',
		})
	}
}

const checkUndefined = (value) => {
  return value === undefined ? '' : value;
}

const combineNames = (values) => {
  return [
    checkUndefined(values.prefix),
    checkUndefined(values.firstName),
    checkUndefined(values.middelName),
    checkUndefined(values.lastName),
    checkUndefined(values.suffix)
  ]
      .filter(namePart => namePart !== '')
      .join(' ');
}
const generateFile = (values) => {
  const headers = 'SourceJurisdiction,ElectionYear,ElectionJurisdiction,RaceType,Office,District,Seat,EventType,Party,Incumbency,CmteID,CandidateStatus,CandidacyID,CandidateName,Prefix,FirstName,MiddleName,LastName,Suffix,City,State,Street1,Street2,Zip,Gender,OSRace1,OSrace2,Immigrant,Latino,LGBTQ,MENA,PoC,Veteran,WhiteOS,UniqueID,Web,NoPACs,website,Occupation,Generation,Nickname,Phone,Fax,Party1,Party3,CandidateComment,ElectionEventStatus'
  const data = `${checkUndefined(values.jurisdictionSource)},${checkUndefined(values.electionYear)},${checkUndefined(values.jurisdictionElection)},${checkUndefined(values.raceType)},${checkUndefined(values.office)},${checkUndefined(values.district)},${checkUndefined(values.seat)},${checkUndefined(values.eventType)},${checkUndefined(values.party)},${checkUndefined(values.incumbency)},${checkUndefined(values.commiteeId)},,${checkUndefined(values.candidicyId)},${combineNames(values)},${checkUndefined(values.prefix)},${checkUndefined(values.firstName)},${checkUndefined(values.middelName)},${checkUndefined(values.lastName)},${checkUndefined(values.suffix)},${checkUndefined(values.city)},${checkUndefined(values.state)},${checkUndefined(values.address1)},${checkUndefined(values.address2)},${checkUndefined(values.zipcode)},${checkUndefined(values.gender)},${checkUndefined(values.race)},${checkUndefined(values.race2)},${checkUndefined(values.latino)},${checkUndefined(values.lgbtq)},${checkUndefined(values.mena)},${checkUndefined(values.poc)},${checkUndefined(values.veteran)},${checkUndefined(values.white)},${checkUndefined(values.uniqueId)},${checkUndefined(values.website)},${checkUndefined(values.noPacs)},${checkUndefined(values.website)},${checkUndefined(values.occupation)},${checkUndefined(values.generation)},${checkUndefined(values.nickname)},${checkUndefined(values.phone)},${checkUndefined(values.fax)},${checkUndefined(values.party1)},${checkUndefined(values.party3)},${checkUndefined(values.comments)},${checkUndefined(values.electionStatus)}`
  return new Blob([[headers, data].join('\n')], {type: 'text/csv'})
}



const genderOptions = [
	{ value: 'POC', label: 'POC' },
	{ value: 'Veteran', label: 'Veteran' },
	{ value: 'White', label: 'White' },	
	{ value: 'Immigrant', label: 'Immigrant' },	
	{ value: 'Latino', label: 'Latino' },	
	{ value: 'MENA', label: 'MENA' }
]

const lgbtqOptions = [
	{ value: 'Unknown', label: 'Unknown' },
	{ value: 'Yes', label: 'Yes' },
	{ value: 'No', label: 'No' },
]

// let district = ref(''); // make sure you have the district ref defined
// let office = ref(''); // make sure you have the office ref defined
//
// watch(district, (newValue, oldValue) => {
//   if (newValue !== oldValue) {
//     store.dispatch('fetchStep3Values', { district: newValue, office: office.value });
//   }
// });
//
// watch(office, (newValue, oldValue) => {
//   if (newValue !== oldValue) {
//     store.dispatch('fetchStep3Values', { district: district.value, office: newValue });
//   }
// });
</script>