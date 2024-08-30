### Example 1:

# Page.js:

<div className='customButton'> </div>

<!-- =======================RECOMMEND=================== -->

### Example 2:

# Page.js:

<div className='custom'> </div>

<!--============== case 1 =================== -->

# Style.scss:

.custom{
@extend .customButton (.customButton in pattern.scss)
}

<!--========================================= -->

<!--============== case 2 =================== -->

# Style.scss:

.custom{
@include customButton (@mixin customButton in variabales.scss)
}

<!--========================================= -->
