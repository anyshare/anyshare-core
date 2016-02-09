<!DOCTYPE html>
<html lang="en-us">
  <head>
    <!-- *** General page information *** -->
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->
    <meta charset="UTF-8"/>
    <title>
      @section('title')
        {{ trans('general.seo_title')}}
      @show
    </title>
    <!-- Mobile Specific Metas-->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Template info -->
    <meta name="author" content="A. Gianotto">
    <meta name="description" content="">
    <meta name="keywords" content="">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ asset('assets/css/compiled/bootstrap-social.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/compiled/app.css') }}">
    <link rel="stylesheet" href="{{ Theme::asset('css/styles.css', null, true) }}">

    <!-- PAGE LEVEL SCRIPTS -->
		<link href="{{ asset('assets/css/header-1.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/color_scheme/orange.css') }}" rel="stylesheet" type="text/css" />

    <!-- Bootstrap Table style -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.8.1/bootstrap-table.min.css" type="text/css" media="screen" />

    <script type="text/javascript">var plugin_path = '/assets/plugins/';</script>

    <!-- jQuery 2.1.4-->
    <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>

    <!-- Bootstrap 3 and Bootstrap Table Javascript -->
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <!-- Bootstrap debug, very handy when working on a responsive layouts -->
    @if( getenv('APP_DEBUG'))
			<!-- <script src="assets/js/extensions/debug/bootstrap-debugger.js"></script> -->
    @endif
  <link rel="shortcut icon" href="/favicon.ico">
  </head>

<body class="smoothscroll enable-animation">
  <!-- wrapper -->
		<div id="wrapper">

      <div>@include('partials.header')</div>

      @if (!Route::is('home'))
          <!-- Notifications -->

            <div class="col-md-12 margin-top-0">
              @include('notifications')
            </div>

      @endif


      <div>@yield('content')</div>

      <div>@include('partials.footer')</div>

    </div>
    <!-- /wrapper -->


<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-73360507-1', 'auto');
  ga('send', 'pageview');

</script>


</body>
</html>
