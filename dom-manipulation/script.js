document.addEventListener('DOMContentLoaded', function() {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const quoteDisplay = document.getElementById('quoteDisplay');
    const categoryFilter = document.getElementById('categoryFilter');

    function showRandomQuote() {
        const filteredQuotes = quotes.filter(quote => categoryFilter.value === 'all' || quote.category === categoryFilter.value);
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        quoteDisplay.textContent = randomQuote ? `"${randomQuote.text}" - ${randomQuote.category}` : 'No quotes available for this category.';
    }

    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (newQuoteText && newQuoteCategory) {
            quotes.push({ text: newQuoteText, category: newQuoteCategory });
            localStorage.setItem('quotes', JSON.stringify(quotes));
            populateCategories();
            showRandomQuote();
        }
    }

    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function filterQuotes() {
        showRandomQuote();
    }

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    populateCategories();
    showRandomQuote();
});
