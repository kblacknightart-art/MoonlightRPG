from playwright.sync_api import sync_playwright
import time

def verify_dungeon_visuals():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8080/Index.html")

        # Wait for initialization (e.g. creation modal if it appears, or directly call enterDungeon if possible)
        # The game seems to start with a creation modal.
        # However, window.enterDungeon should work globally if main.js is loaded.

        # Wait for page load
        page.wait_for_load_state("networkidle")

        # Call enterDungeon directly to bypass other flows
        page.evaluate("window.enterDungeon('F')")

        # Wait for the dungeon visuals to be inserted into DOM
        try:
            page.wait_for_selector("#dungeon-visuals", timeout=5000)
            print("Dungeon visuals container found.")
        except:
            print("Dungeon visuals container NOT found.")
            page.screenshot(path="verification/failed_visuals.png")
            return

        # Wait a bit for images to load (if they were broken, they wouldn't load, but we want to see the layout)
        time.sleep(2)

        # Take a screenshot of the relevant area (main-stage or action-grid)
        # action-grid is where we injected the visuals
        element = page.locator("#action-grid")
        if element.is_visible():
            element.screenshot(path="verification/dungeon_visuals.png")
            print("Screenshot taken: verification/dungeon_visuals.png")
        else:
            print("action-grid not visible.")
            page.screenshot(path="verification/full_page.png")

        browser.close()

if __name__ == "__main__":
    verify_dungeon_visuals()
