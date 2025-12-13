// API route to fetch search results from SearXNG
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { company, source } = req.body;

    if (!company || !source) {
        return res.status(400).json({ error: 'Company name and source required' });
    }

    // Site domains
    const siteDomains = {
        zauba: 'zaubacorp.com',
        companyCheck: 'thecompanycheck.com',
        tofler: 'tofler.in',
        falconebiz: 'falconebiz.com'
    };

    const domain = siteDomains[source];
    if (!domain) {
        return res.status(400).json({ error: 'Invalid source' });
    }

    try {
        // Use site: operator in query for focused results
        const query = `site:${domain} ${company}`;
        const searchUrl = `https://searxng.codesec.me/search?q=${encodeURIComponent(query)}&format=json&engines=google,bing,duckduckgo`;

        console.log('Searching:', searchUrl);

        const response = await fetch(searchUrl, {
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`SearXNG returned ${response.status}`);
        }

        const data = await response.json();
        console.log('Results count:', data.results?.length || 0);

        // Take top 8 results
        const results = (data.results || [])
            .slice(0, 8)
            .map(r => ({
                title: r.title || '',
                url: r.url || '',
                snippet: r.content || ''
            }));

        res.status(200).json({ results, source, domain, query });
    } catch (error) {
        console.error('Search error:', error.message);
        res.status(500).json({ error: 'Failed to fetch results', message: error.message });
    }
}
