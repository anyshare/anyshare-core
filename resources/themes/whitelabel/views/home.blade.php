@extends('layouts.master')

@section('content')
<script src="/js/extensions/mobile/bootstrap-table-mobile.js"></script>

<section class="container">
   <div class="row">
       <h2>Oh hai! {{ $whitelabel_group->name }}</h2>
</div><!--end row-->
</section>
@stop
