document.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll('input[type="radio"]');

    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Get the selected offer box ID from the radio button
            const selectedId = this.id;
            const offerBoxes = document.querySelectorAll('.offer-box');
            let totalPrice = 0; // Initialize total price

            // Loop through each offer box
            offerBoxes.forEach(box => {
                const offerBoxId = box.id.replace('offer-box-', 'offer');

                // Check if the current box's ID matches the selected radio button's ID
                if (offerBoxId === selectedId) {
                    // Add 'selected' class to the current offer box
                    box.classList.add('selected');

                    // Show additional options based on the selected offer
                    const additionalOptions = box.querySelector('.additional-options');
                    if (additionalOptions) {
                        additionalOptions.style.display = 'block';

                        // Add additional details based on the selected value
                        const count = selectedId === 'offer1' ? 1 : 
                                       selectedId === 'offer2' ? 2 : 
                                       selectedId === 'offer3' ? 3 : 0;

                        let optionsHTML = `
                            <div class="size-color-labels">
                                <label for="size">Size:</label>
                                <label for="color">Color:</label>
                            </div>`;

                        for (let i = 1; i <= count; i++) {
                            optionsHTML += `
                                <div class="user-details">
                                    <div class="field-Id-Number"><p>#${i}</p></div>
                                    <div class="user-size-color">
                                        <div class="select-wrapper">
                                            <select id="size-${i}" name="size">
                                                <option value="small">S</option>
                                                <option value="medium">M</option>
                                                <option value="large">L</option>
                                            </select>
                                        </div>
                                        <div class="select-wrapper">
                                            <select id="color-${i}" name="color">
                                                <option value="red">Red</option>
                                                <option value="blue">Blue</option>
                                                <option value="green">Green</option>
                                            </select>               
                                        </div>              
                                    </div>             
                                </div>`;
                        }

                        additionalOptions.innerHTML = optionsHTML;
                    }

                    // Update the total price for the selected offer
                    const pricingDetails = box.querySelector('.pricing-details .current-price');
                    if (pricingDetails) {
                        const priceText = pricingDetails.textContent.trim();
                        totalPrice = parseFloat(priceText.replace('$', '').replace(' USD', ''));
                    }
                } else {
                    // Remove 'selected' class from non-selected boxes
                    box.classList.remove('selected');

                    // Hide additional options for non-selected boxes
                    const additionalOptions = box.querySelector('.additional-options');
                    if (additionalOptions) additionalOptions.style.display = 'none';
                }
            });

            // Update the total price display
            const totalPriceElement = document.getElementById('total-price');
            totalPriceElement.textContent = `$${totalPrice.toFixed(2)} USD`;
        });
    });

    // Initialize default selection
    const defaultRadio = document.querySelector('input[type="radio"]:checked');
    if (defaultRadio) {
        defaultRadio.dispatchEvent(new Event('change'));
    }
});
