/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    //Test suite "RSS Feeds".
    describe('RSS Feeds', () => {

        // make sure that the allFeeds variable has been defined and not emptyز
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //make sure each feed has a URL defined and not empty.
        it('url defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        //make sure each feed has a name defined and not empty.
        it('name defined', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    // Test suite "The menu".
    describe('The menu', () => {
        // make sure the menu element is hidden by default.

        let body = document.body,
            menuIcon = document.querySelector(".menu-icon-link");

        it('menu element hidden by default', () => {
            expect(body.className).toContain('menu-hidden');            
        });

         // make sure the menu changes visibility when the menu icon is clicked.
        it('menu element visible when menu icon clicked', () => {
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);            
        });
    });


    // Test suite "Initial Entries".
    describe('Initial Entries', () => {
        // make sure presence of a single .entry element within the .feed container after "loadFeed" is completed.

         beforeEach((done) => {
            loadFeed(0, done);            
         });

         it('presence ofa single .entry element within the .feed container', () => {
            let entriesNum = document.querySelector('.feed').getElementsByClassName('entry').length;
            expect(entriesNum).not.toEqual(0);
         });
    
    });

    // Test suite "New Feed Selection".
    describe('New Feed Selection', () => {
        let oldContent;
        //it tests if the feed container is changed when loading new feed content
        beforeEach((done) => {
            loadFeed(0, () => {
                oldContent = document.querySelector('.feed').innerHTML;
                loadFeed(1, () => {
                    done();
                });

            });            
        });

        it('change feed content', (done) => {
            let newContent = document.querySelector('.feed').innerHTML;
            expect(oldContent).not.toBe(newContent);
            done();
        });
    });
        
}());
