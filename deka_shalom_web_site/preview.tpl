<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta http-equiv=\"Cache-control\" content=\"no-cache\">
		<title>WebAcappella Preview mode</title>
		<meta name="description" content="Demo Webacappella"/>
		<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="preview_frame/css/screen.css">
		<link rel="icon" href="preview_frame/img/favicon.png">
		<script>
			waDirectLink = "{{localNetworkLink}}";
		</script>
		<script src="wa_bootstrap/js/jquery.min.js"></script>
		<script src="preview_frame/js/jquery.qrcode.min.js"></script>
		<script src="preview_frame/js/preview.js"></script>
		<style>
			@media (max-width: 500px)
			{
				#visit{display : none}
			}
			#visit:hover
			{
				text-decoration: underline !important;
			}
		</style>
	</head>
	<body>
		<div id="header">
			<div style="display: inline-block;  height: 75px; margin-left : 20px;">
				<a href="{{webacappella_URL}}"><img src="preview_frame/img/wa.png" style="height:55px;margin-top:10px;"/></a>
			</div>
			<ul id="devices">
				<li>
					<a href="javascript:void(0);" class='change-device active' data-target='desktop' >
						<img src='preview_frame/img/desktop.png' alt='Web' />
					</a>
				</li>
				<li>
					<a href="javascript:void(0);" class='change-device' data-target='tablet-h'>
						<img src='preview_frame/img/tablet-h.png' alt='Tablette' />
					</a>
				</li>
				<li>
					<a href="javascript:void(0);" class='change-device' data-target='tablet-v'>
						<img src='preview_frame/img/tablet-v.png' alt='Tablette' />
					</a>
				</li>
				<li>
					<a href="javascript:void(0);" class='change-device' data-target='mobile'>
						<img src='preview_frame/img/mobile.png' alt='Mobile' />
					</a>
				</li>
			</ul>
			<a id="visit" style="margin:55px 25px 0px 0px;float:right;font-family: Open Sans; color:white;text-decoration:none;" href="{{preview_frame_URL}}" >
				{{visit_text_label}}
			</a>

		</div>
		<div id="iframe-container" class="desktop">
			<div id="iframe-wrapper">
				<div id="loadingMessage"><img src="preview_frame/img/loading.gif" alt="loading"></div>
				<iframe id="framelive" name="framelive" src="{{preview_frame_URL}}"></iframe>
			</div>
		</div>
		<div id="qrcode" style="z-index:20;">
			<a href="{{localNetworkLink}}">
				<div id="qrcode-inner"></div>
			</a>
			<div id="qrcode-text">
				{{qrcode_text}}
			</div>
		</div>
	</body>
</html>