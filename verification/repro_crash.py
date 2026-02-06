from playwright.sync_api import sync_playwright
import time

def reproduce_crash():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Load game
        page.goto("http://localhost:8080/Index.html")
        page.wait_for_load_state("networkidle")

        # 2. Skip creation
        page.fill("#inp-name", "Tester")
        page.click("#card-student")
        page.click("#btn-roll")
        time.sleep(1)
        page.click("#btn-start")

        # 3. Navigate to Shinjuku
        page.evaluate("window.nav('city')")
        time.sleep(0.5)
        page.evaluate("window.MapSystem.openDistrict('Shinjuku')")
        time.sleep(0.5)

        # 4. Attempt to enter dungeon
        try:
            if page.locator("text=Alcantarillas").count() > 0:
                print("Found 'Alcantarillas'. Clicking...")
                page.click("text=Alcantarillas")
            else:
                print("Dungeon card not found.")
                page.screenshot(path="verification/repro_no_card.png")
                return
        except Exception as e:
            print(f"Click failed: {e}")

        time.sleep(2)

        # 6. Check results
        if page.locator("#dungeon-visuals").is_visible():
            print("SUCCESS: Dungeon visuals visible.")
            page.screenshot(path="verification/repro_success.png")
        else:
            print("FAILURE: Dungeon visuals NOT visible.")
            page.screenshot(path="verification/repro_failure.png")

        browser.close()

if __name__ == "__main__":
    reproduce_crash()
