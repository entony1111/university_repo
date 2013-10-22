SARM.INDEX = 
{
	addAuthor: function ()
	{
		if(!$('#author-full-name').val())
		{
			return;
		}
		var item = $('.author-list-template').clone().removeClass('author-list-template').removeClass('hidden').addClass('author-list-item');
		item.find('.author-name').text($('#author-full-name').val());
		$('#monograph-author-list').append(item);
		$('#author-full-name').val('');
	},
	deleteAuthor: function (el)
	{
		el.closest('.author-list-item').remove();
	},
	wsitchTab: function (ev)
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
				SARM.INDEX.wsitchTab(ev);
			});
}