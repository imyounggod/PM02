/* JS Document */

/******************************

[Оглавление]

1. Переменные и единицы
2. Установка заголовка
3. Начальное меню
4. Начальная статистика
5. Инициализация
6. Начальная форма поиска


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Переменные и единицы

	*/

	var menu = $('.menu');
	var menuActive = false;
	var header = $('.header');
	var ctrl = new ScrollMagic.Controller();
	var searchActive = false;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initStats();
	initMilestones();
	initSearchForm();

	/* 

	2. Установка заголовка


	*/

	function setHeader()
	{
		if(window.innerWidth < 992)
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		else
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		if(window.innerWidth > 991 && menuActive)
		{
			closeMenu();
		}
	}

	/* 

	3. Начальное меню


	*/

	function initMenu()
	{
		if($('.hamburger').length && $('.menu').length)
		{
			var hamb = $('.hamburger');
			var close = $('.menu_close_container');

			hamb.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
				else
				{
					closeMenu();
				}
			});

			close.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
				else
				{
					closeMenu();
				}
			});

	
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	4. Начальная статистика

	*/

	function initStats()
	{
		if($('.stats_item').length)
		{
			// Получение всех элементы с классом .stats_item
			var statsItems = $('.stats_item');

			// Пройдемся по каждому .stats_item
			statsItems.each(function()
			{
				// Получить .stats_bar, который находится внутри .stats_item
				var item = $(this).find('.stats_bar');
				// Получить элемент, который будет отображать процент на графике
				var perc = item.find('.stats_bar_perc');
				// Получить элемент, который будет показывать процент в числе
				var val = item.find('.stats_bar_value');
				// Получить первое значение
				var x = item.attr("data-x");
				// Получить второе значение
				var y = item.attr("data-y");
				// Получить цвет в процентах
				var clr = item.attr("data-color");

				// Получить процент увеличения / уменьшения
				var xPerc = Math.round(((y - x) / x) * 100);
				// Если это положительное значение
				if(xPerc > 0)
				{
					var percBarWidth = xPerc;
					if(xPerc > 100)
					{
						percBarWidth = 100;
					}
					perc.css('left', "50%");
					perc.css('width', percBarWidth / 2 + "%");
					val.text("+" + xPerc + "%");
					val.css('left', "0");
					val.css('text-align', "left");
				}
				// Если это отрицательное значение
				else
				{
					xPerc = Math.abs(xPerc);
					var percBarWidth = xPerc;
					if(xPerc > 100)
					{
						percBarWidth = 100;
					}
					perc.css('right', "50%");
					perc.css('width', percBarWidth / 2 + "%");
					val.text("-" + xPerc + "%");
					val.css('right', "0");
					val.css('text-align', "right");
				}
				perc.css('background', clr);
			});
		}
	}

	/* 

	5. Инициализация

	*/

	function initMilestones()
	{
		if($('.milestone_counter').length)
		{
			var milestoneItems = $('.milestone_counter');

	    	milestoneItems.each(function(i)
	    	{
	    		var ele = $(this);
	    		var endValue = ele.data('end-value');
	    		var eleValue = ele.text();

	    		/* Используйте data-sign-before и data-sign-after, 
	    		чтобы добавить знаки перед или за номером счетчика */
	    		var signBefore = "";
	    		var signAfter = "";

	    		if(ele.attr('data-sign-before'))
	    		{
	    			signBefore = ele.attr('data-sign-before');
	    		}

	    		if(ele.attr('data-sign-after'))
	    		{
	    			signAfter = ele.attr('data-sign-after');
	    		}

	    		var milestoneScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var counter = {value:eleValue};
		    		var counterTween = TweenMax.to(counter, 4,
		    		{
		    			value: endValue,
		    			roundProps:"value", 
						ease: Circ.easeOut, 
						onUpdate:function()
						{
							document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
						}
		    		});
		    	})
			    .addTo(ctrl);
	    	});
		}
	}

	/* 

	6. Начальная форма поиска

	*/

	function initSearchForm()
	{
		if($('.search_form').length)
		{
			var searchForm = $('.search_form');
			var searchInput = $('.search_content_input');
			var searchButton = $('.content_search');

			searchButton.on('click', function(event)
			{
				event.stopPropagation();

				if(!searchActive)
				{
					searchForm.addClass('active');
					searchActive = true;

					$(document).one('click', function closeForm(e)
					{
						if($(e.target).hasClass('search_content_input'))
						{
							$(document).one('click', closeForm);
						}
						else
						{
							searchForm.removeClass('active');
							searchActive = false;
						}
					});
				}
				else
				{
					searchForm.removeClass('active');
					searchActive = false;
				}
			});	
		}
	}
});