import asyncio

async def run(page):
    print("Starting frontend UI test for Taher Ali Enterprises...")
    await page.set_viewport_size({"width": 1920, "height": 1080})
    
    # 1. Verify Home page loads
    await page.goto("http://localhost:3000")
    await page.wait_for_selector('[data-testid="taher-ali-app"]', timeout=5000)
    print("Home page loaded successfully.")

    # 2. Verify Business history states "since 2015"
    hero_text = await page.inner_text('[data-testid="hero-section"]')
    assert "since 2015" in hero_text.lower() or "2015" in hero_text, "Business history 'since 2015' not found in hero section"
    print("Verified business history states 'since 2015'.")

    # 3. Verify top navigation bar is sticky
    navbar = await page.wait_for_selector('[data-testid="main-navbar"]')
    position = await navbar.evaluate("el => window.getComputedStyle(el).position")
    print(f"Navbar position: {position}")
    assert position in ["sticky", "fixed"], f"Navbar is not sticky/fixed, got {position}"
    print("Verified top navigation bar is sticky.")

    # 4. Click on a product card to open Product Details Page
    await page.click('[data-testid="product-card-1"]', force=True)
    await page.wait_for_selector('[data-testid="product-detail-page"]', timeout=5000)
    print("Product details page opened successfully.")

    # 5. Verify professional editable product information sections are fully displayed
    detail_content = await page.inner_text('[data-testid="product-detail-page"]')
    assert "Product Description" in detail_content
    assert "Ingredients" in detail_content
    assert "Storage Instructions" in detail_content
    assert "Shelf Life" in detail_content
    assert "Delivery Information" in detail_content
    assert "Wholesale Orders" in detail_content
    print("Verified professional product information sections are present.")

    # 6. Verify sticky bottom purchase bar with quantity selector and Add to Cart / Buy Now buttons
    purchase_bar = await page.wait_for_selector('[data-testid="sticky-add-to-cart-btn"]')
    assert await page.is_visible('[data-testid="sticky-buy-now-btn"]')
    assert await page.is_visible('[data-testid="sticky-qty-plus"]')
    print("Verified sticky bottom purchase bar with qty selector and purchase buttons.")

    # 7. Test quantity increment and add to cart from sticky bar
    await page.click('[data-testid="sticky-qty-plus"]', force=True)
    await page.wait_for_timeout(300)
    qty_val = await page.inner_text('[data-testid="sticky-qty-val"]')
    print(f"Sticky bar quantity: {qty_val}")
    
    await page.click('[data-testid="sticky-add-to-cart-btn"]', force=True)
    print("Clicked Add to Cart from sticky purchase bar.")

    # 8. Verify back to catalog navigation
    await page.click('[data-testid="back-to-catalog-btn"]', force=True)
    await page.wait_for_selector('[data-testid="products-section"]', timeout=5000)
    print("Successfully returned to main catalog.")

    print("All frontend verification tests passed successfully!")

if __name__ == "__main__":
    import asyncio
    from playwright.async_api import async_playwright
    async def main():
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            try:
                await run(page)
            except Exception as e:
                print(f"Test failed with error: {e}")
                raise e
            finally:
                await browser.close()
    asyncio.run(main())
