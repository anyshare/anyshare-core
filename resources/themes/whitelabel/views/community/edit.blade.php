@extends('layouts/master')

{{-- Page title --}}
@section('title')
     {{ trans('general.community.settings') }} ::
@parent
@stop


{{-- Page content --}}
@section('content')

<!-- -->
			<section>
				<div class="container margin-top-20">

					<div class="row">



						<!-- COMMUNITY -->
						<div class="col-md-4">

							<h2 class="size-16">EDIT COMMUNITY</h2>

							<!-- login form -->
							<form method="post" action="{{ route('community.edit.save') }}" enctype="multipart/form-data" autocomplete="off">
                {!! csrf_field() !!}

								<div class="clearfix">

									<!-- Name -->
									<div class="form-group">
										<input type="text" name="name" class="form-control" placeholder="Community Name" required="" value="{{ Input::old('name', $community->name) }}">
                    {!! $errors->first('name', '<span class="help-block">:message</span>') !!}
									</div>

                  <!-- Slug -->
    							<div class="form-group{{ $errors->first('subdomain', ' has-error') }}">
                    <label for="subdomain">Subdomain *</label>
    								  <input type="text" name="subdomain" class="form-control" placeholder="awesome.anysha.re" required="" value="{{ Input::old('subdomain', $community->subdomain) }}">
                    {!! $errors->first('subdomain', '<span class="help-block">:message</span>') !!}
    							</div>

                  <!-- Type -->
                  <div class="form-group">
                     {!! Form::community_types('group_type', Input::old('group_type', $community->group_type)) !!}
                     {!! $errors->first('group_type', '<span class="help-block">:message</span>') !!}
                  </div>

                  <!-- Theme -->
                  <div class="form-group">
                    {{ Form::select('theme', $themes, $community->theme, array('class'=>'select2', 'style'=>'width:100%')) }}
                    {!! $errors->first('theme', '<span class="help-block">:message</span>') !!}
                  </div>

								</div>

								<div class="row">

									<div class="col-md-12 col-sm-12 col-xs-12 text-right">
										<button class="btn btn-primary">{{ trans('general.community.save') }}</button>
									</div>

								</div>

							</form>
						</div>
            <!-- RIGHT TEXT -->
            <div class="col-md-5">


              <p class="text-muted">[checkboxes go here]</p>

            </div>
            <!-- /LEFT TEXT -->


					</div>
				</div>
			</section>
			<!-- / -->



@stop
