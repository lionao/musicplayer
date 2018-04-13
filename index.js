$(function(){
	setTimeout(function(){
		$.get('./songs.json').then(function(response){
			let items = response
			items.forEach((i)=>{
				let $li = $(`			 
					<li>
						<a href="./song.html?id=${i.id}">
							<h3>${i.name}</h3>
							<p>
								<svg class="sq">
									<use xlink:href="#icon-sq"></use>
								</svg>
								${i.singer} - 专辑</p>
								<svg class="play">
									<use xlink:href="#icon-play-circle"></use>
								</svg>
						</a>
					</li>
							`)
				$('#lastestMusic').append($li)			
			})
			$('#lastestMusicLoading').remove()
		})
	},1000)
	//hot_songs
	setTimeout(function(){
		$.get('./songs.json').then(function(response){
			let items = response
			items.forEach((i)=>{
				let $li = $(`			 
					<li>
						<a href="./song.html?id=${i.id}">
							<h3>${i.name}</h3>
							<p>
								<svg class="sq">
									<use xlink:href="#icon-sq"></use>
								</svg>
								${i.singer} - 专辑</p>
								<svg class="play">
									<use xlink:href="#icon-play-circle"></use>
								</svg>
						</a>
					</li>
							`)
				$('#hot').append($li)			
			})
			$('#tab2Loading').remove()
		})
	},1000)
	$('.siteNav').on('click','ol.tabItems>li',function(e){
		let $li = $(e.currentTarget).addClass('active')
		$li.siblings().removeClass('active')
		let index = $li.index()
		$li.trigger('tabChange',index)
		$('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')

	})
	$('.siteNav').on('tabChange',function(e,index){
		let $li = $('.tabContent > li').eq(index)
		if($li.attr('data-downloaded') === 'yes'){
				return
			}
		if(index === 1){
			$.get('./page2.json').then((response)=>{
				let items = response
				$li.attr('data-downloaded','yes')
			})
		}else if(index === 2){
			$.get('./page3.json').then((response)=>{
				$li.attr('data-downloaded','yes')
			})
		}
	})


	let timer = undefined
	$('input#searchSong').on('input',function(e){
		let $input = $(e.currentTarget)
		let value = $input.val().trim()
		if(value === ''){
			return
		}
		if(timer){
			clearTimeout(timer)
		}

		timer = setTimeout(function(){
			search(value).then((result)=>{
				timer = undefined
				if(result.length !==0 ){
					$('#output').text(result.map((r)=>r.name).join(','))
				}else{
					$('#output').text('no result')
				}
			})
		},1000)
	})

	function search(keyword){
		return new Promise((resolve,reject)=>{
			var database = [
			{"id":1 , "name":"Time to say goodbye",},
			{"id":2 , "name":"How Long",},
			{"id":3 , "name":"牡丹江",},
			]
			let result = database.filter(function(item){
				return item.name.indexOf(keyword)>=0
			})
			$('#tab3Loading').remove()
			setTimeout(function(){
				resolve(result)
			},(Math.random()*200 + 1000))
		})
	}
})

