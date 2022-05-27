import{_ as n,c as s,o as a,a as t}from"./app.6d4e9497.js";const h=`{"title":"Recipes","description":"","frontmatter":{},"headers":[{"level":2,"title":"Using non-standard database that is compatible with PostgreSQL wire protocol (such as CockroachDB)","slug":"using-non-standard-database-that-is-compatible-with-postgresql-wire-protocol-such-as-cockroachdb"},{"level":2,"title":"Connecting to MSSQL on Azure SQL Database","slug":"connecting-to-mssql-on-azure-sql-database"},{"level":2,"title":"Adding a full-text index for PostgreSQL","slug":"adding-a-full-text-index-for-postgresql"},{"level":2,"title":"DB access using SQLite and SQLCipher","slug":"db-access-using-sqlite-and-sqlcipher"},{"level":2,"title":"Maintaining changelog for seeds (version >= 0.16.0-next1)","slug":"maintaining-changelog-for-seeds-version-0-16-0-next1"},{"level":2,"title":"Using explicit transaction management together with async code","slug":"using-explicit-transaction-management-together-with-async-code"},{"level":2,"title":"Using parentheses with AND operator","slug":"using-parentheses-with-and-operator"},{"level":2,"title":"Calling an oracle stored procedure with bindout variables","slug":"calling-an-oracle-stored-procedure-with-bindout-variables"},{"level":2,"title":"Node instance doesn't stop after using knex","slug":"node-instance-doesn-t-stop-after-using-knex"},{"level":2,"title":"Manually Closing Streams","slug":"manually-closing-streams"}],"relativePath":"faq/recipes.md"}`,p={},e=t(`<h1 id="recipes" tabindex="-1">Recipes <a class="header-anchor" href="#recipes" aria-hidden="true">#</a></h1><h2 id="using-non-standard-database-that-is-compatible-with-postgresql-wire-protocol-such-as-cockroachdb" tabindex="-1">Using non-standard database that is compatible with PostgreSQL wire protocol (such as CockroachDB) <a class="header-anchor" href="#using-non-standard-database-that-is-compatible-with-postgresql-wire-protocol-such-as-cockroachdb" aria-hidden="true">#</a></h2><p>Specify PostgreSQL version that database you are using is compatible with protocol-wise using <code>version</code> option, e. g.:</p><div class="language-js"><pre><code><span class="token keyword">const</span> knex <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;knex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">client</span><span class="token operator">:</span> <span class="token string">&#39;pg&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">version</span><span class="token operator">:</span> <span class="token string">&#39;7.2&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">connection</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">&#39;your_database_user&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;your_database_password&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">&#39;myapp_test&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Note that value of <code>version</code> option should be not the version of the database that you are using, but version of PostgreSQL that most closely matches functionality of the database that you are using. If not provided by database vendor, try using &#39;7.2&#39; as a baseline and keep increasing (within the range of existing PostgreSQL versions) until it starts (or stops) working.</p><p>There are also known incompatibilities with migrations for databases that do not support select for update. See <a href="https://github.com/tgriesser/knex/issues/2002" target="_blank" rel="noopener noreferrer">https://github.com/tgriesser/knex/issues/2002</a> for a workaround.</p><h2 id="connecting-to-mssql-on-azure-sql-database" tabindex="-1">Connecting to MSSQL on Azure SQL Database <a class="header-anchor" href="#connecting-to-mssql-on-azure-sql-database" aria-hidden="true">#</a></h2><p><code>{encrypt: true}</code> should be included in options branch of connection configuration:</p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">client</span> <span class="token operator">:</span> <span class="token string">&#39;mssql&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">connection</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">&#39;mydatabase&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">server</span><span class="token operator">:</span> <span class="token string">&#39;myserver.database.windows.net&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">&#39;myuser&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;mypass&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">1433</span><span class="token punctuation">,</span>
    <span class="token literal-property property">connectionTimeout</span><span class="token operator">:</span> <span class="token number">30000</span><span class="token punctuation">,</span>
    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">encrypt</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><a href="https://github.com/tediousjs/node-mssql#configuration-1" target="_blank" rel="noopener noreferrer">See all of node-mssql&#39;s connection options</a></p><h2 id="adding-a-full-text-index-for-postgresql" tabindex="-1">Adding a full-text index for PostgreSQL <a class="header-anchor" href="#adding-a-full-text-index-for-postgresql" aria-hidden="true">#</a></h2><div class="language-js"><pre><code>exports<span class="token punctuation">.</span><span class="token function-variable function">up</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">knex</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> knex<span class="token punctuation">.</span>schema<span class="token punctuation">.</span><span class="token function">createTable</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">table</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    table<span class="token punctuation">.</span><span class="token function">increments</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    table<span class="token punctuation">.</span><span class="token function">specificType</span><span class="token punctuation">(</span><span class="token string">&#39;fulltext&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;tsvector&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    table<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span><span class="token string">&#39;fulltext&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&#39;gin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="db-access-using-sqlite-and-sqlcipher" tabindex="-1">DB access using SQLite and SQLCipher <a class="header-anchor" href="#db-access-using-sqlite-and-sqlcipher" aria-hidden="true">#</a></h2><p>After you build the SQLCipher source and the npm SQLite3 package, and encrypt your DB (look elsewhere for these things), then anytime you open your database, you need to provide your encryption key using the SQL statement:</p><div class="language-sql"><pre><code>PRAGMA <span class="token keyword">KEY</span> <span class="token operator">=</span> <span class="token string">&#39;secret&#39;</span>
</code></pre></div><p>This PRAGMA is more completely documented in the SQLCipher site. When working with Knex this is best done when opening the DB, via the following:</p><div class="language-js"><pre><code><span class="token keyword">const</span> myDBConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">client</span><span class="token operator">:</span> <span class="token string">&quot;sqlite3&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">connection</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&quot;myEncryptedSQLiteDbFile.db&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">pool</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">afterCreate</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">conn<span class="token punctuation">,</span> done</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      conn<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">&quot;PRAGMA KEY = &#39;secret&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>  
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> knex <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;knex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">(</span>myDBConfig<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Of course embedding the key value in your code is a poor security practice. Instead, retrieve the &#39;secret&#39; from elsewhere.</p><p>The key Knex thing to note here is the &quot;afterCreate&quot; function. This is documented in the <a href="http://knexjs.org" target="_blank" rel="noopener noreferrer">knexjs.org</a> site, but is not in the Table of Contents at this time, so do a browser find when on the site to get to it. It allows auto-updating DB settings when creating any new pool connections (of which there will only ever be one per file for Knex-SQLite).</p><p>If you don&#39;t use the &quot;afterCreate&quot; configuration, then you will need to run a knex.raw statement with each and every SQL you execute, something like as follows:</p><div class="language-js"><pre><code><span class="token keyword">return</span> knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&quot;PRAGMA KEY = &#39;secret&#39;&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;some_table&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;query-error&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">ex<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
        <span class="token string">&quot;KNEX select from some_table ERR ex:&quot;</span><span class="token punctuation">,</span> 
        ex<span class="token punctuation">,</span> 
        <span class="token string">&quot;obj:&quot;</span><span class="token punctuation">,</span> 
        obj
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="maintaining-changelog-for-seeds-version-0-16-0-next1" tabindex="-1">Maintaining changelog for seeds (version &gt;= 0.16.0-next1) <a class="header-anchor" href="#maintaining-changelog-for-seeds-version-0-16-0-next1" aria-hidden="true">#</a></h2><p>In case you would like to use Knex.js changelog functionality to ensure your environments are only seeded once, but don&#39;t want to mix seed files with migration files, you can specify multiple directories as a source for your migrations:</p><div class="language-ts"><pre><code><span class="token keyword">await</span> knex<span class="token punctuation">.</span>migrate<span class="token punctuation">.</span><span class="token function">latest</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    directory<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;src/services/orders/database/migrations&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;src/services/orders/database/seeds&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    sortDirsSeparately<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    tableName<span class="token operator">:</span> <span class="token string">&#39;orders_migrations&#39;</span><span class="token punctuation">,</span>
    schemaName<span class="token operator">:</span> <span class="token string">&#39;orders&#39;</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="using-explicit-transaction-management-together-with-async-code" tabindex="-1">Using explicit transaction management together with async code <a class="header-anchor" href="#using-explicit-transaction-management-together-with-async-code" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">await</span> knex<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span>trx <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">stuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    trx<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;Foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">stuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// do something</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Or alternatively:</p><div class="language-ts"><pre><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> knex<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span>trx <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">stuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      trx<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;always explicit rollback this time&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">stuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token comment">// transaction was committed</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// transaction was rolled back </span>
  <span class="token punctuation">}</span>
</code></pre></div><p>(note that promise for <code>knex.transaction</code> resolves after transaction is rolled back or committed)</p><h2 id="using-parentheses-with-and-operator" tabindex="-1">Using parentheses with AND operator <a class="header-anchor" href="#using-parentheses-with-and-operator" aria-hidden="true">#</a></h2><p>In order to generate query along the lines of</p><div class="language-sql"><pre><code><span class="token keyword">SELECT</span> <span class="token string">&quot;firstName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;lastName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;status&quot;</span>
<span class="token keyword">FROM</span> <span class="token string">&quot;userInfo&quot;</span> 
<span class="token keyword">WHERE</span> <span class="token string">&quot;status&quot;</span> <span class="token operator">=</span> <span class="token string">&#39;active&#39;</span>
<span class="token operator">AND</span> <span class="token punctuation">(</span><span class="token string">&quot;firstName&quot;</span> <span class="token operator">ILIKE</span> <span class="token string">&#39;%Ali%&#39;</span> <span class="token operator">OR</span> <span class="token string">&quot;lastName&quot;</span> <span class="token operator">ILIKE</span> <span class="token string">&#39;%Ali%&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>you need to use following approach:</p><div class="language-js"><pre><code>queryBuilder
  <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">&#39;status&#39;</span><span class="token punctuation">,</span> status<span class="token punctuation">.</span>uuid<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">andWhere</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">qB</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> qB
    <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">&#39;firstName&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ilike&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">%</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>q<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">orWhere</span><span class="token punctuation">(</span><span class="token string">&#39;lastName&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ilike&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">%</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>q<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
</code></pre></div><h2 id="calling-an-oracle-stored-procedure-with-bindout-variables" tabindex="-1">Calling an oracle stored procedure with bindout variables <a class="header-anchor" href="#calling-an-oracle-stored-procedure-with-bindout-variables" aria-hidden="true">#</a></h2><p>How to call and retrieve output from an oracle stored procedure</p><div class="language-ts"><pre><code><span class="token keyword">const</span> oracle <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;oracledb&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> bindVars <span class="token operator">=</span> <span class="token punctuation">{</span>
  input_var1<span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
  input_var2<span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
  output_var<span class="token operator">:</span> <span class="token punctuation">{</span>
    dir<span class="token operator">:</span> oracle<span class="token punctuation">.</span><span class="token constant">BIND_OUT</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output_message<span class="token operator">:</span> <span class="token punctuation">{</span>
    dir<span class="token operator">:</span> oracle<span class="token punctuation">.</span><span class="token constant">BIND_OUT</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> sp <span class="token operator">=</span> <span class="token string">&#39;BEGIN MULTIPLY_STORED_PROCEDURE(:input_var1, :input_var2, :output_var, :output_message); END;&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> results <span class="token operator">=</span> <span class="token keyword">await</span> knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span>sp<span class="token punctuation">,</span> bindVars<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>results<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6 * 7 is the answer to life</span>
</code></pre></div><h2 id="node-instance-doesn-t-stop-after-using-knex" tabindex="-1">Node instance doesn&#39;t stop after using knex <a class="header-anchor" href="#node-instance-doesn-t-stop-after-using-knex" aria-hidden="true">#</a></h2><p>Make sure to close knex instance after execution to avoid Node process hanging due to open connections:</p><div class="language-js"><pre><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">migrate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> knex<span class="token punctuation">.</span>migrate<span class="token punctuation">.</span><span class="token function">latest</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token comment">/**config**/</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      knex<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ignore</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">migrate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="manually-closing-streams" tabindex="-1">Manually Closing Streams <a class="header-anchor" href="#manually-closing-streams" aria-hidden="true">#</a></h2><p>When using Knex&#39;s <a href="http://knexjs.org/#Interfaces-Streams" target="_blank" rel="noopener noreferrer">stream interface</a>, you can typically just <code>pipe</code> the return stream to any writable stream. However, with <a href="http://nodejs.org/api/http.html#http_http_incomingmessage" target="_blank" rel="noopener noreferrer"><code>HTTPIncomingMessage</code></a>, you&#39;ll need to take special care to handle aborted requests.</p><p>An <code>HTTPIncomingMessage</code> object is typically called <code>request</code>. This is the first argument in <code>&#39;request&#39;</code> events emitted on <code>http.Server</code> instances. <a href="http://expressjs.com/4x/api.html#request" target="_blank" rel="noopener noreferrer">Express&#39;s <code>req</code></a> implements a compatible interface and Hapi exposes this object on <a href="http://hapijs.com/api#request-object" target="_blank" rel="noopener noreferrer">its request objects</a> as <code>request.raw.req</code>.</p><p>You need to explicitly handle the case where an <code>HTTPIncomingMessage</code> is closed prematurely when streaming from a database with Knex. The easiest way to cause this is:</p><ol><li>Visit an endpoint that takes several seconds to fully transmit a response</li><li>Close the browser window immediately after beginning the request</li></ol><p>When this happens while you are streaming a query to a client, you need to manually tell Knex that it can release the database connection in use back to the connection pool.</p><div class="language-js"><pre><code>server<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;request&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> stream <span class="token operator">=</span> knex<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;items&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  request<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;close&#39;</span><span class="token punctuation">,</span> stream<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,47),o=[e];function c(i,l,u,r,k,d){return a(),s("div",null,o)}var f=n(p,[["render",c]]);export{h as __pageData,f as default};
