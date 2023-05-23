<template>
    <header class="bg-white mb-4">
		<div class="layout-width border-bottom">
			<div class="container">
				<div class="navbar-header p-0">
					<div class="d-flex">
						<!-- LOGO -->
						<div class="navbar-brand-box">
							<span class="logo-lg">
								<router-link to="/home"><img src="@/assets/images/opensecrets.svg" alt="" height="45" /></router-link>
							</span>
						</div>
					</div>

					<div class="d-flex align-items-center bg-white">
						<button type="button" class="btn shadow-none" id="page-header-user-dropdown"
							data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span class="d-flex align-items-center">
								<img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-1.jpg"
									alt="Header Avatar" />
								<span class="text-start ms-xl-2">
									<span class=" d-none d-xl-inline-block ms-1 fw-medium user-name-text">Anna Adame</span>
									<span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
										<button class="btn btn-primary btn-sm">Logout</button>
									</span>
								</span>
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>