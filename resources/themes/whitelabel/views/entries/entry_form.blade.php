        <!-- entry form -->
        @if(isset($entry))
        <form method="post" action="{{ route('entry.edit.save', $entry->id) }}" enctype="multipart/form-data" autocomplete="off" class="nomargin">
        @else
        <form method="post" action="{{ route('entry.create.ajax.save') }}" enctype="multipart/form-data" autocomplete="off" class="nomargin" id='entry_form'>
        @endif
          {!! csrf_field() !!}
          <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value={{ trans('general.entries.max_size')}} />
          <input type="hidden" name="upload_key" id="upload_key" value="" />
          <input type="hidden" id="rotation" name="rotation" value=''>
          <input type="hidden" id="entryId" name="entryId" value=''>
          <input type="hidden" id="deleteImage" name="deleteImage" value=''>

          <div class="row">
            <div class="col-lg-9 col-md-9 col-md-push-3">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-3 margin-bottom-10">
                      <select class="form-control" name="post_type" id="post_type">
                        @if(isset($entry))
                          @foreach($post_types as $key=>$val)
                            @if ($entry->post_type == $key)
                              <option value="{{ $key }}" selected>{{ $val }}</option>
                            @else
                              <option value="{{ $key }}">{{ $val }}</option>
                            @endif
                          @endforeach
                        @else
                          <option value="want">{{ trans('general.entries.want')}}</option>
                          <option value="have">{{ trans('general.entries.have')}}</option>
                        @endif
                      </select>
                    </div> <!-- col 3 -->
                    <div class="col-md-3 margin-bottom-10">
                      <!-- stepper -->
                      @if(isset($entry))
                        <input type="text" value="{{ old('qty', $entry->qty) }}" min="1" max="1000" class="form-control stepper" id="qty" name="qty">
                      @else
                        <input type="text" value="1" min="1" max="1000" class="form-control stepper" id="qty" name="qty">
                      @endif

                    </div> <!-- col 3 -->
                    <div class="col-md-6 margin-bottom-8">
                      <!-- Name -->
                      <label class="input">
                      @if(isset($entry))
                        <input type="text" name="title" id="title" required='' class="form-control" placeholder="{{ trans('general.entries.title_placeholder')}}" value="{{ old('title', $entry->title) }}" autofocus>
                      @else
                        <input type="text" name="title" id="title" required='' class="form-control" placeholder="{{ trans('general.entries.title_placeholder')}}" value="" autofocus>
                      @endif
                      </label>
                    </div> <!-- col 6 -->

                    <div class="col-xs-12">
                      <!-- File upload   -->
                      <div class="fancy-file-upload fancy-file-info">
                        <i class="fa fa-picture-o"></i>
                        <input id="choose-file" type="file" class="form-control" accept="image/jpg,image/png,image/jpeg,image/gif" name="file" onchange="jQuery(this).next('input').val(this.value);"/>
                        <input id="shadow_input" type="text" class="form-control" placeholder="{{ trans('general.entries.file_placeholder')}}" readonly="" />
                        <span class="button">{{ trans('general.uploads.choose_file') }}</span>
                      </div> <!-- fancy -->
                      <p class="too_large smooth_font margin-bottom-0" style="display:none;font-size:30px">{{ trans('general.entries.max_file_size')}}</p>
                    </div> <!-- col 12-->
                  </div> <!-- row-->
                </div> <!-- col 12-->

                <div id="dialog-confirm" title="Delete image?">
                  <p><i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><span>This image will be permanently deleted. Are you sure?</span></p>
                </div>

                <div class="pull-right col-xs-12">
                  <div id="image_box_container">
                    <div id="image_box">
                      <!-- contains background image -->
                    </div>
                    <div class="row">
                      <div class="col-md-12 image_controls">
                        <div class="row">
                          <div class="col-xs-12">
                            <i class="fa fa-2x fa-rotate-right" aria-hidden="true" id="rotate_image" title="rotate image"></i>
                          </div>
                          <div class="col-xs-12">
                            <i class="fa fa-2x fa-times" aria-hidden="true" id="delete_image" title="remove image"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> <!-- col 12-->

                <div class="col-xs-4 col-xs-offset-4">
                  <div id="progressbar">
                    <!-- progress bar -->
                  </div>
                </div>

                <div class="col-md-12">
                  <!-- Description -->
                  <label class="input">
                    @if(isset($entry))
                      <textarea name="description" rows="5" class="form-control" data-maxlength="200" id="description" data-info="textarea-words-info" placeholder="{{ trans('general.entries.details_placeholder')}}">{{ old('description', $entry->description) }}</textarea>
                    @else
                      <textarea name="description" rows="5" class="form-control" data-maxlength="200" id="description" data-info="textarea-words-info" placeholder="{{ trans('general.entries.details_placeholder')}}"></textarea>
                    @endif
                  </label>
                </div> <!-- col 12 -->

                <div class="col-md-12">
                <!-- Tags -->
                  <label class="input">
                    @if(isset($entry))
                      <input data-role="tagsinput" type="text" name="tags" id="tags"  class="col-md-12 form-control" placeholder="{{ trans('general.entries.tag_placeholder')}}" value="{{ old('tags', $entry->tags) }}">
                    @else
                      <input data-role="tagsinput" type="text" name="tags" id="tags"  class="col-md-12 form-control" placeholder="{{ trans('general.entries.tag_placeholder')}}" value="">
                    @endif
                  </label>
                </div> <!-- col 12 -->
                    
                <div class="col-md-12">
                  <!-- Location -->
                  <label class="control-label sr-only" for="location">Location</label>
                  <div class="input-group">
                    @if(isset($entry))
                      <input type="text" class="form-control" id="location" name="location" placeholder="{{ trans('general.entries.location_placeholder')}}" aria-describedby="basic-addon2" value="{{{ old('location', $entry->location) }}}">
                    @else
                      <input type="text" class="form-control" id="location" name="location" placeholder="{{ trans('general.entries.location_placeholder')}}" aria-describedby="basic-addon2" value="">
                    @endif                   
                    <div class="input-group-addon" id="basic-addon2">
                      <i class="fa fa-location-arrow" id="geolocate"></i>
                    </div>
                  </div> <!-- input-group -->
                </div>

                <div class="col-xs-9">
                  <label class="checkbox pull-left" for="visible_checkbox">
                    @if(isset($entry))
                    {{ Form::checkbox('private', 1, !old('visible',$entry->visible), array('id'=>'visible_checkbox')) }}
                    @else
                      {{ Form::checkbox('private', 1, 0, array('id'=>'visible_checkbox')) }}
                    @endif
                    <i></i> {{ trans('general.entries.visible')}}
                  </label>
                </div> <!-- col 10 -->

                <div class="col-xs-3 ">
                  @if(isset($entry))
                    <button class="btn btn-info pull-right">
                  @else
                    <button class="btn btn-info pull-right" id="ajaxSubmit" name="ajaxSubmit" value="ajaxSubmit">
                  @endif
                      {{ trans('general.entries.save_entry') }}
                    </button>
                  <a class="btn btn-info pull-right" id="cancel_button" href="">{{ trans('general.entries.cancel') }}</a>
                </div> <!-- col 2 -->
              </div> <!-- row -->
            </div> <!-- col 9 -->

            <div class="col-md-3 col-sm-4 col-xs-12 col-md-pull-9 col-sm-pull-8">
              <div class="form-group" style="margin-bottom: 5px;">
                <fieldset class="margin-bottom-10">

                  <legend class="sr-only">Exchange by:</legend>
                  <div class="exchange_types">
                    <!-- checkboxes for exchange types -->
                    <div class="checkbox">
                      @foreach ($whitelabel_group->exchangeTypes as $exchange_types)
                        <div class="col-md-12 pull-left margin-bottom-10">
                          <label class="checkbox col-md-12 pull-left margin-bottom-10 padding-left-10">
                            {{ Form::checkbox('exchange_types['.$exchange_types->id.']', $exchange_types->id, true, ['class' => 'exchanges']) }}
                            <i></i> {{ $exchange_types->name }}
                          </label>
                        </div>
                      @endforeach
                      <div class="col-md-12 pull-left margin-bottom-10">
                        <label class="checkbox col-md-12 pull-left margin-bottom-10">
                          {{ Form::checkbox('select_all', 10, false, ['id' => 'select_all']) }}
                          <i></i> {{trans('general.community.all_exchanges')}}
                        </label>
                      </div>
                    </div>
                  </div> <!-- exchange_types -->
                </fieldset>
              </div> <!-- form-group -->
            </div> <!-- col-md-3 -->
          </div>  <!-- row -->
        </form>