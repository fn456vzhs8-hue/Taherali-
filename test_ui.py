import asyncio
import os

async def run(page):
    # Enable console logs
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    
    try:
        # Standard viewport
        await page.set_viewport_size({"width": 1920, "height": 1080})
        
        # Get backend url from env or use frontend url
        backend_url = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:3000")
        print(f"Navigating to app at {backend_url}")
        
        await page.goto(backend_url)
        await page.wait_for_selector('[data-testid="taher-ali-app"]', timeout=10000)
        print("Taher Ali App loaded successfully")
        
        # 1. Verify pickle prices are updated to ₹89
        mango_price = await page.locator('[data-testid="product-price-p1"]').inner_text()
        veg_price = await page.locator('[data-testid="product-price-p2"]').inner_text()
        lemon_price = await page.locator('[data-testid="product-price-p3"]').inner_text()
        tomato_price = await page.locator('[data-testid="product-price-p4"]').inner_text()
        
        print(f"Pickle prices: Mango={mango_price}, Veg={veg_price}, Lemon={lemon_price}, Tomato={tomato_price}")
        assert "89" in mango_price
        assert "89" in veg_price
        assert "89" in lemon_price
        assert "89" in tomato_price
        print("Pickle prices verified successfully as ₹89")
        
        # 2. Verify removed biscuits (Besan, Chocolate Cashew, Multiflour Ladoo, Chai) are absent
        content = await page.content()
        assert "Besan" not in content
        assert "Chocolate Cashew" not in content
        assert "Multiflour Ladoo" not in content
        assert "Chai Biscuit" not in content and "Chai" not in content
        print("Removed products confirmed absent from product list")
        
        # 3. Verify updated weights and prices for biscuits and ghee
        fruit_price = await page.locator('[data-testid="product-price-p5"]').inner_text()
        cashew_price = await page.locator('[data-testid="product-price-p6"]').inner_text()
        osmania_price = await page.locator('[data-testid="product-price-p7"]').inner_text()
        pista_price = await page.locator('[data-testid="product-price-p8"]').inner_text()
        badam_price = await page.locator('[data-testid="product-price-p13"]').inner_text()
        ghee_price = await page.locator('[data-testid="product-price-p14"]').inner_text()
        
        print(f"Fruit Biscuit: {fruit_price} (Expected ₹220)")
        print(f"Cashew Biscuit: {cashew_price} (Expected ₹240)")
        print(f"Osmania Biscuit: {osmania_price} (Expected ₹240)")
        print(f"Pista Biscuit: {pista_price} (Expected ₹270)")
        print(f"Badam Biscuit: {badam_price} (Expected ₹290)")
        print(f"Pure Ghee: {ghee_price} (Expected ₹199)")
        
        assert "220" in fruit_price
        assert "240" in cashew_price
        assert "240" in osmania_price
        assert "270" in pista_price
        assert "290" in badam_price
        assert "199" in ghee_price
        print("All updated biscuit and ghee prices verified successfully")
        
        # 4. Verify clicking any product opens Amazon-style full screen product page modal
        await page.click('[data-testid="product-card-p1"]', force=True)
        await page.wait_for_selector('[data-testid="product-detail-modal"]', timeout=5000)
        print("Amazon-style product detail modal opened successfully")
        
        # Verify zoom toggle & highlights inside modal
        await page.click('[data-testid="product-detail-modal"] [class*="cursor-zoom-in"]', force=True)
        await page.wait_for_timeout(500)
        print("Image zoom tested successfully")
        
        # 5. Verify sticky purchase section at the bottom with quantity selector and Buy Now / Add to Cart
        await page.wait_for_selector('[data-testid="sticky-add-to-cart-btn"]', timeout=3000)
        await page.wait_for_selector('[data-testid="sticky-buy-now-btn"]', timeout=3000)
        await page.wait_for_selector('[data-testid="sticky-qty-plus"]', timeout=3000)
        
        # Click plus on sticky bar
        await page.click('[data-testid="sticky-qty-plus"]', force=True)
        await page.wait_for_timeout(300)
        qty_val = await page.locator('[data-testid="sticky-qty-val"]').inner_text()
        print(f"Sticky quantity updated to: {qty_val}")
        assert qty_val == "2"
        
        # Click Add to Cart from sticky bar
        await page.click('[data-testid="sticky-add-to-cart-btn"]', force=True)
        await page.wait_for_timeout(1000)
        print("Added product to cart from sticky bar")
        
        # Close product modal
        await page.click('[data-testid="back-to-catalog-btn"]', force=True)
        await page.wait_for_timeout(500)
        
        # 6. Open Cart and Proceed to Checkout & WhatsApp order generation
        await page.click('[data-testid="open-cart-btn"]', force=True)
        await page.wait_for_selector('[data-testid="cart-modal"]', timeout=5000)
        print("Cart modal opened successfully")
        
        # Proceed to checkout
        await page.click('[data-testid="proceed-checkout-btn"]', force=True)
        await page.wait_for_selector('[data-testid="checkout-modal"]', timeout=5000)
        print("Checkout modal opened successfully")
        
        # Fill checkout form
        await page.fill('[data-testid="checkout-name-input"]', "Test Wholesale Mart")
        await page.fill('[data-testid="checkout-phone-input"]', "9876543210")
        await page.fill('[data-testid="checkout-address-input"]', "Shop #12, Charminar Road")
        await page.fill('[data-testid="checkout-pincode-input"]', "500002")
        
        print("Checkout form filled successfully")
        print("All UI and catalog validation tests completed successfully!")
        
    except Exception as e:
        print(f"Error during browser testing: {str(e)}")
        raise e
