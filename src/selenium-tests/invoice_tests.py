import time

from selenium import webdriver
from selenium.common import TimeoutException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.ie.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

invoice_number = "12345"
expected_price = "1456879.00"

def create_invoice(driver, invoice_number):
    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "btn-success"))
    ).click()

    time.sleep(10)

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME,"invoiceNumber")))

    driver.find_element(By.NAME,"invoiceNumber").send_keys(invoice_number)

    time.sleep(10)

    seller_select = Select(driver.find_element(By.NAME,"seller"))
    WebDriverWait(driver, 10).until(lambda d: len(seller_select.options) > 1)
    seller_select.select_by_index(1)

    buyer_select = Select(driver.find_element(By.NAME, "buyer"))
    WebDriverWait(driver, 10).until(lambda d: len(buyer_select.options) > 1)
    buyer_select.select_by_index(2)

    driver.find_element(By.NAME, "issued").send_keys("010112000")
    driver.find_element(By.NAME, "dueDate").send_keys("010112001")
    driver.find_element(By.NAME, "product").send_keys("Testovací produkt")
    driver.find_element(By.NAME, "price").send_keys(expected_price)
    driver.find_element(By.NAME, "dph").send_keys("21")
    driver.find_element(By.NAME, "note").send_keys("Poznamka k fature")

    time.sleep(10)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "btn-primary"))
    ).click()

def verify_invoice(driver, invoice_number, expected_price):
    try:
        invoice_row = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//tr[td[normalize-space()='{invoice_number}']]"))
        )
    except TimeoutException:
        assert False, f"Test selhal: Faktura s cislem {invoice_number} nebyla nalezena!"

    price_element = invoice_row.find_element(By.XPATH, ".//td[position()=last()-1]")
    actual_price = price_element.text.strip()

    assert actual_price == expected_price, (f"Test selhal: Faktura nema spravnou cenu! Ocekvano: {expected_price}"
                                            f"Nalezeno: {actual_price}")

    print("Test prosel! Faktura byla uspesne pridana do seznamu")


def delete_invoice(driver, invoice_number):
    try:
        invoice_row = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//tr[td[normalize-space()='{invoice_number}']]"))
        )

        delete_button = invoice_row.find_element(By.XPATH, ".//button[contains(text(),'Odstranit')]")
        delete_button.click()

        print(f"Faktura {invoice_number} byla úspěšně smazána.")

    except TimeoutException:
        print(f"Chyba: Faktura {invoice_number} nebyla nalezena pro smazání.")

    except Exception as e:
        print(f"Chyba při mazání faktury: {e}")


service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:3000")
    driver.maximize_window()

    create_invoice(driver, invoice_number)
    verify_invoice(driver, invoice_number, expected_price)

except Exception as e:
    print("Test selhal:", e)

finally:
    delete_invoice(driver, invoice_number)
    driver.quit()