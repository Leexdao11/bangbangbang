// The `enabled` flag will be `false` if CSS 3D isn't available

        if ( $.fn.makisu.enabled ) {

            var $nigiri = $( '.leftMenu' );

            // Create Makisus

            $nigiri.makisu({
                selector: '.ListTitle',
                overlap: 0.85,
                speed: 1.7
            });

            $maki.makisu({
                selector: '.ListTitle',
                overlap: 0.6,
                speed: 0.85
            });

            $sashimi.makisu({
                selector: '.ListTitle',
                overlap: 0.2,
                speed: 0.5
            });
            
            $nigiri.makisu({
                selector: '.menuList',
                overlap: 0.85,
                speed: 1.7
            });

            $maki.makisu({
                selector: '.menuList',
                overlap: 0.6,
                speed: 0.85
            });

            $sashimi.makisu({
                selector: '.menuList',
                overlap: 0.2,
                speed: 0.5
            });

            // Open all


}