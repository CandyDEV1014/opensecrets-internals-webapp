<template>
	<div style="width: 100%; padding: 24px 0; margin: -24px 0; background-color: white; margin-bottom: 0px;" class="shadow">
		<div class="container ">
				<ul class="nav nav-pills page-title-box" style="margin: -24px; box-shadow: none;">
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i class="mdi mdi-account-box-multiple" /> Candidates</a>
					<ul class="dropdown-menu">
						<li><router-link class="dropdown-item" to="/home">Dedupe and Merge candidates</router-link></li>
						<li><router-link class="dropdown-item" to="/candidates/add">Manually add new candidate</router-link></li>				
						<li><a class="dropdown-item" href="#">Review Candidates with invalid districts</a></li>
						<li><a class="dropdown-item" href="#">Review potentially fake Candidates</a></li>
						<li><a class="dropdown-item" href="#">Update Candidate</a></li>
						<li><a class="dropdown-item" href="#">Update Person</a></li>
						<li><router-link class="dropdown-item" to="/file-upload">Upload File</router-link></li>
					</ul>
				</li>
		
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i class="mdi mdi-vote" /> Elections</a>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="#">Create Election Event</a></li>
						<li><a class="dropdown-item" href="#">Election CRUD</a></li>
					</ul>
				</li>
		
				<li class="nav-item dropdown">
					<a class="nav-link" href="#" role="button" aria-expanded="false"><i class="las la-money-bill-wave" /> Contributions</a>
				</li>
		
				<li class="nav-item dropdown">
					<a class="nav-link" href="#" role="button" aria-expanded="false"><i class="mdi mdi-account-group" /> Commitees</a>
				</li>
		
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i class="mdi mdi-cog" /> Rules Configuration</a>
					<ul class="dropdown-menu">
						<li><router-link class="dropdown-item" to="/rules/add">Entity Coding</router-link></li>
						<li><a class="dropdown-item" href="#">Individual Coding</a></li>
						<li><a class="dropdown-item" href="#">Standardization</a></li>
						<li><a class="dropdown-item" href="#">Transaction Coding</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup>
</script>