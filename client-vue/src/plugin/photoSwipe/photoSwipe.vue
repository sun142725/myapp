<template>

    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

        <!-- Background of PhotoSwipe.
7          It's a separate element, as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

            <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
            <div class="pswp__container">
                <!-- don't modify these 3 pswp__item elements, data is added later on -->
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">

                <div class="pswp__top-bar">

                    <!--  Controls are self-explanatory. Order can be changed. -->

                    <div class="pswp__counter"></div>

                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                    <!--<button class="pswp__button pswp__button&#45;&#45;share" title="Share"></button>

                    <button class="pswp__button pswp__button&#45;&#45;fs" title="Toggle fullscreen"></button>

                    <button class="pswp__button pswp__button&#45;&#45;zoom" title="Zoom in/out"></button>-->

                    <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--<div class="pswp__share-modal pswp__share-modal&#45;&#45;hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>-->

                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>

                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>

            </div>

        </div>

    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'photoSwipe',
    methods: {
        openPhotoSwipe(item,arr) {
            let pswpElement = document.querySelectorAll('.pswp')[0];
            let pswpTopBar= document.querySelectorAll('.pswp__top-bar')[0];

            // pswpTopBar.style.top = parseFloat(this.interactive.statusBarHeight.height) - 0.88 + 'rem';
            require([
                'photoswipe/dist/photoswipe.js',
                'photoswipe/dist/photoswipe-ui-default.js',
                'photoswipe/dist/photoswipe.css',
                'photoswipe/dist/default-skin/default-skin.css'
            ], function (PhotoSwipe, PhotoSwipeUI_Default) {
                if(!arr || arr.length === 0){
                    arr=[];
                    arr.push(item);
                }
                const items = [];
                let j = 0;
                for(let i = 0;i<arr.length;i++){
                    if(item.src === arr[i].src){
                        j = i;
                    }
                    items.push(
                        {
                            src: arr[i].src,
                            w: 0,
                            h: 0,
                        }
                    )
                }
                const options = {
                    index: j,
                    tapToClose:true,
                    shareEl:false,
                    // fullscreenEl:false,
                    arrowEl: false
                };
                let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
                gallery.listen('gettingData', (index, item) => {
                    if (item.w < 1 || item.h < 1) { // unknown size
                        let img = new Image();
                        img.onload = function() { // will get size after load
                            item.w = this.width; // set image width
                            item.h = this.height; // set image height
                            gallery.invalidateCurrItems(); // reinit Items
                            gallery.updateSize(true); // reinit Items
                        };
                        img.src = item.src; // let's download image
                        console.log(img)
                    }
                });
                gallery.init()
            });
        }
    },
    computed:{
        // interactive:{
        //     get(){
        //         return store.state.interactive
        //     }
        // }
    }
}
</script>