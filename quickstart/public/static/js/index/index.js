SARM.INDEX = 
{
	handleMonographFormatting: function()
	{
            var compiled = {
               plcae : $('#monograph-publication-place-publication-input')
                       .val().substr(0,1),
               pName : $('#monograph-publication-name-publication-input')
                       .val(),
               date : $('#monograph-publication-date').datepicker('getDate'),
               pages : $('#monograph-publication-pages').val(),
               mName : $('#monograph-publication-monograph-name-input').val(),
               authors : [] 
            };
            $('#monograph-content-author-list .author-list-item')
               .each(function(){
                   var spl = $(this).find('.author-name').text().split(' ');
                   compiled.authors.push(
                   {
                       surname : spl[0],
                       initials : spl[1]
                   });
                //get authors
            });
            var res = "";
            if(compiled.authors.length)
            {
                if(compiled.authors.length > 1)
                {
                    var authors = compiled.authors[0].initials
                            +' '+compiled.authors[0].surname+',';
                    for(var i = 1 ; i < compiled.authors.length; i++)
                    {
                        authors = authors +' '+ compiled.authors[i].initials
                        +' '+compiled.authors[i].surname+',';
                    }
                    authors = authors.substr(0, authors.length - 1);
                    
                    res = compiled.authors[0].surname+' '
                    +compiled.authors[0].initials+' '+compiled.mName
                    +' / '+authors+'. - '
                    +compiled.plcae+'.: '+compiled.pName+', '+2011+'.-'
                    +compiled.pages+' c.';
                    //multiple case
                }else{
                    res = compiled.authors[0].surname+' '
                    +compiled.authors[0].initials+' '+compiled.mName
                    +' / '+compiled.authors[0].initials+' '
                    +compiled.authors[0].surname+'. - '
                    +compiled.plcae+'.: '+compiled.pName+', '+2011+'.-'
                    +compiled.pages+' c.';
                    //single case
                }
            }
            $('#output-result').prop('value', res);
	},
	handleTextbookFormatting: function()
	{
		
	},
	handleArticleFormatting: function()
	{
		
	},
	handleThesisFormatting: function()
	{
		
	},
	handleEresourceFormatting: function()
	{
		
	},
	addAuthor: function (ev)
	{
	    var  id = ev.closest('.content').attr('id');
		if(!$('#'+id+'-author-full-name').val())
		{
			return;
		}
		var item = $('#'+id+' .author-list-template').clone()
                        .removeClass('author-list-template')
                        .removeClass('hidden').addClass('author-list-item');
		item.find('.author-name')
                        .text($('#'+id+'-author-full-name').val());
		$('#'+id+'-author-list').append(item);
		$('#'+id+'-author-full-name').val('');
                SARM.INDEX.handleMonographFormatting();
	},
	deleteAuthor: function (el)
	{
		var id = el.closest('.content').attr('id');
		el.closest('#'+id+' .author-list-item').remove();
                SARM.INDEX.handleMonographFormatting();
	},
	switchTab: function (ev)
	{
		$('#input-block-tabs li').removeClass('active');
		$(ev.currentTarget).addClass('active');
		$('.content').hide();
		$('#'+ev.currentTarget.id+'-content').show();
	}
};

SARM.init = function ()
{
	$('#input-block-tabs li').click(function(ev)
			{
				SARM.INDEX.switchTab(ev);
			});
	
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(),
        nowTemp.getDate(), 0, 0, 0, 0);
	$('.datepicker').datepicker({
		startView: 2,
		format: 'mm/dd/yyyy',
		autoclose: true
	}).on('changeDate', function()
	{
		SARM.INDEX.handleMonographFormatting();
	});
	$('.datepicker').datepicker('setDate', new Date());
};